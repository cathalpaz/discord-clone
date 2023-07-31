
from flask import Blueprint,  request
from ..models import User, db, Server, ServerInvite
from flask_login import current_user, login_required
from ..errors import NotFoundError, ForbiddenError
from ..forms.server_invite_form import ServerInviteForm
from ..utils.validate_errors import validation_errors_to_error_messages


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


# TODO DRY THIS UP PLS!
# TODO CHECK IF USER HAS A SERVER INVITE ALREADY TO SAID SERVER

@server_invites_route.route("/<username>/<int:server_id>", methods=["POST"])
@login_required
def send_server_invite(username, server_id):
    sender_user = User.query.get(current_user.id)
    receiver_user = User.query.filter(User.username == username).first()
    server = Server.query.get(server_id)
    if not sender_user or not receiver_user:
        not_found_error = NotFoundError("User Not Found")
        return not_found_error.error_json()
    if not server:
        not_found_error = NotFoundError("Server Not Found")

    possible_server_invite = ServerInvite.query.filter(
        ServerInvite.server_id == server.id,
        ServerInvite.user_id == receiver_user.id
    ).first()
    if possible_server_invite:
        return {"error": "User already has an invite to this server"}, 409
    # server is not public and user that does not own the server is inviting users
    if not server.public and sender_user.id != server.owner_id:
        forbidden_error = ForbiddenError(
            "You do not have permissions to invite here")
        return forbidden_error.error_json()

    # sender is not in the server they're trying to invite someone to
    if sender_user not in server.users:
        forbidden_error = ForbiddenError(
            "You have invalid permissions to do that")
        return forbidden_error.error_json()
    # TODO this is not a forbidden error. Its a bad request. fix it
    # user they're inviting is already in the server
    if receiver_user in server.users:
        forbidden_error = ForbiddenError(f"{username} already in server")
        return forbidden_error.error_json()
    new_server_invite = ServerInvite(
        server_id=server.id,
        owner_id=sender_user.id,
        user_id=receiver_user.id,
    )
    db.session.add(new_server_invite)
    db.session.commit()
    return new_server_invite.to_dict()


@server_invites_route.route("/<int:id>", methods=["PUT"])
@login_required
def update_server_invite(id):
    server_invite = ServerInvite.query.get(id)
    user = User.query.get(current_user.id)
    if not server_invite:
        not_found_error = NotFoundError("Server invite not found")
        return not_found_error.error_json()
    if server_invite not in user.server_invites_received:
        forbidden_error = ForbiddenError("You cannot edit this invite")
        return forbidden_error.error_json()
    server = Server.query.get(server_invite.server_id)
    # maybe the server is deleted before user has a change to accept
    # ! but we should implement delete on cascade for it
    if not server:
        not_found_error = NotFoundError("Server not found")
    form = ServerInviteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_invite.status = form.data["action"]
        if form.data['action'] == 'ACCEPTED':
            user.servers.append(server)
            db.session.commit()
        return server_invite.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}
