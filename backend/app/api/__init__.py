from flask import Blueprint
from api import auth_routes, user_routes, server_routes

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("")
def index():
    return "<h1>hello, world</h1>"


bp.register_blueprint(auth_routes.auth_routes)
bp.register_blueprint(user_routes.user_routes)
bp.register_blueprint(server_routes.server_routes)
