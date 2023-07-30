
from flask import Blueprint,  request
from ..models import User, db
from flask_login import current_user, login_required
from ..errors import NotFoundError


server_invites_route = Blueprint(
    "server_invites", __name__, url_prefix="/server-invites")


@server_invites_route.route("/current")
@login_required
def get_user_server_invites():
    user = User.query.get(current_user.id)
    if not user:
        not_found_error = NotFoundError("User Not Found")
        return not_found_error.error_json()
    return user.to_dict_server_invites_received()
