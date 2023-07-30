from flask import Blueprint
from . import auth_routes, user_routes, server_routes, channel_routes, server_invites_routes

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("")
def index():
    return "<h1>hello, world</h1>"


bp.register_blueprint(auth_routes.auth_routes)
bp.register_blueprint(user_routes.user_routes)
bp.register_blueprint(server_routes.servers_routes)
bp.register_blueprint(channel_routes.channel_routes)
bp.register_blueprint(server_invites_routes.server_invites_route)
