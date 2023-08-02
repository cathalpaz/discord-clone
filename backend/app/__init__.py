import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from .models import db, User
from .socket import socketio
from .seeds import seed_commands
from .config import Config
from .api import bp
from datetime import datetime, timedelta


def create_app(test=False):
    if test == False:
        app = Flask(__name__, static_folder='../../frontend/dist',
                    static_url_path='/')
        app.config.from_object(Config)
        db.init_app(app)
        return app, db
    else:
        app = Flask(__name__, static_folder='../../frontend/dist',
                    static_url_path='/')
        app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///test.db'
        app.config["SECRET_KEY"] = 'lkasdjf'
        db.init_app(app)
        return app, db


app, db = create_app()

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.register_blueprint(bp)

Migrate(app, db)

socketio.init_app(app)

if __name__ == "__main__":
    socketio.run(app)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def set_user_activity():
    if current_user:
        user = User.query.get(current_user.id)
        if user:
            user.last_seen = datetime.utcnow()
            db.session.commit()


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                              app.view_functions[rule.endpoint].__doc__]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
