
from flask import Blueprint, request
from ..models import Channel, User, db
from flask_login import current_user, login_required
from ..forms.channel_form import ChannelForm
from ..errors import NotFoundError, ForbiddenError
from ..utils.validate_errors import validation_errors_to_error_messages

channel_routes = Blueprint("channel_routes", __name__, url_prefix='/channels')


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
