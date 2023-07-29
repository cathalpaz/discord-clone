from flask import Blueprint, request
from ..models import Server, db
from ..models.user import User
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from ..utils.validate_errors import validation_errors_to_error_messages
from ..errors import NotFoundError, ForbiddenError
from ..forms.server_form import ServerForm

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
        not_found_error = NotFoundError("Server Not Found")
        return not_found_error.error_json()
    for serv in user.servers:
        if serv.id == server.id:
            return {"server": server.to_dict()}
    forbidden_error = ForbiddenError("You do not have access to this server!")
    return forbidden_error.error_json()


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


@servers_routes.route("/new", methods=["POST"])
@login_required
def create_server():
    form = ServerForm()
    user = User.query.filter(User.id == current_user.id).first()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        server_data = {val: form.data[val]
                       for val in form.data if val != 'csrf_token'}
        server_data["owner_id"] = user.id
        new_server = Server(**server_data)
        user.servers.append(new_server)
        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict(), 201
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@servers_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    server = Server.query.filter(Server.id == id).first()
    if not server:
        not_found_error = NotFoundError("Server Not Found")
        return not_found_error.error_json()
    if current_user.id != server.owner_id:
        forbidden_error = ForbiddenError(
            "You do not have permission to delete this server!")
        return forbidden_error.error_json()
    db.session.delete(server)
    db.session.commit()
    return {"message": "successfully deleted", "serverId": server.id}


# TODO: DRY THIS UP
@servers_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):
    server = Server.query.filter(Server.id == id).first()
    user = User.query.filter(User.id == current_user.id).first()
    form = ServerForm()
    if not server:
        not_found_error = NotFoundError("Server Not Found")
        return not_found_error.error_json()
    if user.id != server.owner_id:
        forbidden_error = ForbiddenError(
            "You do not have permission to delete this server!")
        return forbidden_error.error_json()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token':
                setattr(server, field, form.data[field])
        db.session.commit()
        return {"server": server.to_dict()}
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
