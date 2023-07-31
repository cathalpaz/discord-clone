from flask import Blueprint, request
from ..models import Channel, User, db, ChannelMessage, Server
from flask_login import current_user, login_required
from ..forms.channel_form import ChannelForm
from ..forms.channel_message import ChannelMessageForm
from ..errors import NotFoundError, ForbiddenError
from ..utils.validate_errors import validation_errors_to_error_messages

channel_routes = Blueprint("channel_routes", __name__, url_prefix='/channels')


# UPDATE server channel
@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_channel(id):
    channel = Channel.query.get(id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    if channel.server.owner_id != current_user.id:
        forbidden_error = ForbiddenError(
            "You do not have access to edit channels in this server")
        return forbidden_error.error_json()
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token':
                setattr(channel, field, form.data[field])
        db.session.commit()
        return {"channel": channel.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}

# TODO: DRY THIS UP


# DELETE server channel
@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    if channel.server.owner_id != current_user.id:
        forbidden_error = ForbiddenError(
            "You do not have access to delete channels in this server")
        return forbidden_error.error_json()
    db.session.delete(channel)
    db.session.commit()
    return {"message": "successfully deleted", "channelId": channel.id}


# GET channel messages
@channel_routes.route("/<int:id>/messages")
@login_required
def get_channel_messages(id):
    channel = Channel.query.get(id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    user = User.query.filter(
        User.id == current_user.id,
        User.servers.any(id=channel.server_id)
    ).first()
    if not user:
        forbidden_error = ForbiddenError(
            "You do not have permissions to view messages")
        return forbidden_error.error_json()
    return {"messages": [message.to_dict() for message in channel.channel_messages]}


# CREATE channel message
@channel_routes.route("/<int:id>/messages", methods=["POST"])
@login_required
def create_channel_message(id):
    channel = Channel.query.get(id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    user = User.query.filter(
        User.id == current_user.id,
        User.servers.any(id=channel.server_id)
    ).first()
    if not user:
        forbidden_error = ForbiddenError(
            "You do not have permissions to send messages")
        return forbidden_error.error_json()
    form = ChannelMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel_message = ChannelMessage(
            content=form.data['content'],
            channel_id=channel.id,
            user_id=user.id,
            updated=False
        )
        db.session.add(new_channel_message)
        db.session.commit()
        return {"message": new_channel_message.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}


# EDIT channel messages
@channel_routes.route("/<int:id>/messages/<int:message_id>", methods=["PUT"])
@login_required
def update_channel_message(id, message_id):
    channel = Channel.query.get(id)
    channel_message = ChannelMessage.query.get(message_id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    user = User.query.filter(
        User.id == current_user.id,
        User.servers.any(id=channel.server_id)
    ).first()
    if not user or channel_message.user_id != user.id:
        forbidden_error = ForbiddenError(
            "You do not have permissions to update this message")
        return forbidden_error.error_json()
    form = ChannelMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message.content = form.data['content']
        channel_message.updated = True
        db.session.commit()
        return {"message": channel_message.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}


# DELETE channel messages
# TODO: check functionality for server owners to delete messages
@channel_routes.route('/<int:id>/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_channel_message(id, message_id):
    channel = Channel.query.get(id)
    owned_servers = Server.query.filter(Server.owner_id == current_user.id).all()
    owned_servers_ids = [server.id for server in owned_servers]
    
    channel_message = ChannelMessage.query.get(message_id)
    if not channel:
        not_found_error = NotFoundError("Channel not found")
        return not_found_error.error_json()
    if not channel_message:
        not_found_error = NotFoundError("Channel Message not found")
        return not_found_error.error_json()
    if channel_message.user_id != current_user.id or channel.server_id not in owned_servers_ids:
        forbidden_error = ForbiddenError(
            "You do not have permissions to delete this message")
        return forbidden_error.error_json()
    db.session.delete(channel_message)
    db.session.commit()
    return {'message': 'Message successfully deleted'}
