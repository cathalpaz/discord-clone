from flask import Blueprint, request
from ..models import Server, db, Channel, users_servers
from ..models.user import User
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from ..utils.validate_errors import validation_errors_to_error_messages
from ..utils.servers import server_owner_required
from ..errors import NotFoundError, ForbiddenError
from ..forms.server_form import ServerForm
from ..forms.channel_form import ChannelForm
from ..utils.s3 import s3
from werkzeug.utils import secure_filename

servers_routes = Blueprint('servers', __name__, url_prefix="/servers")

# GET all public servers


@servers_routes.route("")
def all_servers():
    """
    Query for all public servers and returns them in a list of user dictionaries
    """
    servers = Server.query.filter(Server.public == True).all()
    return {"servers": [server.to_dict() for server in servers]}


# GET all users servers
@servers_routes.route("/current")
@login_required
def all_user_servers():
    user = User.query.filter(User.id == current_user.id).first()
    return {"servers": [server.to_dict() for server in user.servers]}


# GET server information by id
@servers_routes.route("/<int:id>")
@login_required
def server_info(id):
    user = User.query.filter(User.id == current_user.id).first()
    server = Server.query.filter(Server.id == id).first()

    if server.public:
        return {"server": server.to_dict()}
    if not server:
        not_found_error = NotFoundError("Server Not Found")
        return not_found_error.error_json()

    for serv in user.servers:
        if serv.id == server.id:
            return {"server": server.to_dict()}
    forbidden_error = ForbiddenError("You do not have access to this server!")
    return forbidden_error.error_json()


# GET all channels in a server, if you are an authenticated user
@servers_routes.route("/<int:id>/channels")
@login_required
def all_server_channels(id):
    user = User.query.filter(User.id == current_user.id).first()
    server = Server.query.filter(Server.id == id).first()
    if not server:
        not_found_error = NotFoundError("Server Not Found")
        return not_found_error.error_json()
    for serv in user.servers:
        if serv.id == server.id:
            return {"channels": [channel.to_dict() for channel in server.channels]}
    forbidden_error = ForbiddenError("You do not have access to this server!")
    return forbidden_error.error_json()


# CREATE new server channel (if owner)
# TODO: REFACTOR
@servers_routes.route("/<int:id>/channels", methods=["POST"])
@login_required
def create_channel(id):
    server = Server.query.get(id)
    user = User.query.get(current_user.id)
    if not server:
        not_found_error = NotFoundError("Server not found")
        return not_found_error.error_json()
    if user.id != server.owner_id:
        forbidden_error = ForbiddenError(
            "You do not have permissions to make a channel here")
        return forbidden_error.error_json()
    form = ChannelForm()
    form["csrf_token"].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_data = {
            val: form.data[val] for val in form.data if val != "csrf_token"
        }
        new_channel = Channel(**channel_data)
        db.session.add(new_channel)
        server.channels.append(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}


# CREATE new server
@servers_routes.route("/new", methods=["POST"])
@login_required
def create_server():
    form = ServerForm()
    user = User.query.filter(User.id == current_user.id).first()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.file.data
        server_data = {
            "name": form.data['name'],
            "public": form.data['public'],
            "owner_id": user.id,
        }
        if file:
            filename = secure_filename(file.filename)
            success, file_url = s3.upload_file(file, filename, current_user.id)
            server_data["avatar"] = file_url

            if not success:
                return {"errors": [file_url]}, 400

        new_server = Server(**server_data)
        user.servers.append(new_server)
        db.session.add(new_server)
        # add channel
        general_channel = Channel(
            type='text',
            name='general'
        )
        new_server.channels.append(general_channel)
        db.session.commit()
        return new_server.to_dict(), 201
    # print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE server (if owner)
# TODO DELETE AVATAR UNLESS ITS USING PLACEHOLDER AVATAR
@servers_routes.route("/<int:id>", methods=["DELETE"])
@login_required
@server_owner_required
def delete_server(server):
    db.session.delete(server)
    db.session.commit()
    return {"message": "successfully deleted", "serverId": server.id}


# UPDATE server (if owner)
# TODO: DRY THIS UP
# TODO DELETE OLD AVATAR IF UPLOADING A NEW IMAGE. DONT WANT THOSE AWS BILLS
@servers_routes.route("/<int:id>", methods=["PUT"])
@login_required
@server_owner_required
def update_server(server):
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token' and field != 'file':
                setattr(server, field, form.data[field])
        if form.file.data != None:
            file = form.file.data
            filename = secure_filename(file.filename)
            success, file_url = s3.upload_file(file, filename, current_user.id)
            if success:
                setattr(server, 'avatar', file_url)
        db.session.commit()
        return {"server": server.to_dict()}
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# JOIN server
@servers_routes.route("/<int:id>/join")
@login_required
def join_server(id):
    server = Server.query.get(id)
    server.users.append(current_user)
    db.session.commit()
    return {'message': "Joined!"}


# LEAVE server
@servers_routes.route("/<int:id>/leave")
@login_required
def leave_server(id):
    server = Server.query.get(id)
    server.users.remove(current_user)
    db.session.commit()
    return {'message': 'Left'}
