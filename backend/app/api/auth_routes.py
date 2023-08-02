from flask import Blueprint, jsonify, session, request
from ..models import User, db
from ..forms import LoginForm
from ..forms import UserForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from ..utils.validate_errors import validation_errors_to_error_messages
from ..utils.s3 import s3
from werkzeug.utils import secure_filename

auth_routes = Blueprint('auth', __name__, url_prefix="/auth")


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict_extra()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        credentials = form.data['credentials']
        user = User.query.filter(or_(
            User.email == credentials,
            User.username == credentials)).first()
        login_user(user)
        return user.to_dict_servers()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_data = {}
        user_data["username"] = form.data["username"]
        user_data["password"] = form.data["password"]
        user_data["email"] = form.data["email"]
        user_data["birthday"] = form.data["birthday"]
        if form.data["bio"] != None:
            user_data["bio"] = form.data['bio']
        user_data['banner_color'] = form.data["banner_color"]
        user_data["pronouns"] = form.data["pronouns"]
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
        file = form.file.data
        # TODO IMPLEMENT ERROR HANDLING
        if file != None:
            filename = secure_filename(file.filename)
            success, file_url = s3.upload_file(file, filename, user.id)
            if success:
                setattr(user, 'avatar', file_url)
                db.session.commit()

        login_user(user)
        return user.to_dict_extra(), 201
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
