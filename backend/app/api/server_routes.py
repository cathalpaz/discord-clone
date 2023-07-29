from flask import Blueprint
from ..models import Server
from ..models.user import User
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from ..utils.validate_errors import validation_errors_to_error_messages

servers_routes = Blueprint('servers', __name__, url_prefix="/servers")


@servers_routes.route("")
def all_servers():
    """
    Query for all public servers and returns them in a list of user dictionaries
    """
    servers = Server.query.filter(Server.public == True).all()
    return {"severs": [server.to_dict() for server in servers]}


@servers_routes.route("/current")
@login_required
def all_user_servers():
    user = User.query.filter(User.id == current_user.id).first()
    return {"servers": [server.to_dict() for server in user.servers]}


@servers_routes.route("/<int:id>")
@login_required
def server_info(id):
    user = User.query.filter(User.id == current_user.id).first()
    server = Server.query.filter(Server.id == id).first()
    if not server:
        return {"error": "Not found"}, 404
    for serv in user.servers:
        if serv.id == server.id:
            return {"server": server.to_dict()}
    return {"error": "You do not have access to this server"}, 403


@servers_routes.route("/<int:id>/channels")
@login_required
def all_server_channels(id):
    user = User.query.filter(User.id == current_user.id).first()
    server = Server.query.filter(Server.id == id).first()
    if not server:
        return {"error": "Not found"}, 404
    for serv in user.servers:
        if serv.id == server.id:
            return {"channels": {channel.to_dict() for channel in server.channels}}
    return {"error": "You do not have access to this server"}, 403
