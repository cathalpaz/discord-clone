from flask import Blueprint
from ..models import Server
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from ..utils.validate_errors import validation_errors_to_error_messages

servers_routes = Blueprint('servers', __name__, url_prefix="/servers")

@servers_routes.route("/")
def all_servers():
    """
    Query for all servers and returns them in a list of user dictionaries
    """
    servers = Server.query.all()
    return {"severs": [server.to_dict() for server in servers]}
