from flask import Blueprint
from flask_login import current_user, login_required
from ..models import DirectMessage, User
from sqlalchemy import or_

direct_messages_routes = Blueprint('direct_messages', __name__, url_prefix='/@me')


# GET all user direct messages
@direct_messages_routes.route('')
@login_required
def all_direct_messages():
    get_dms = DirectMessage.query.filter(or_(
        DirectMessage.user_from_id == current_user.id,
        DirectMessage.user_to_id == current_user.id,
    )).all()
    dms = [dm.to_dict() for dm in get_dms]
    return {'dms': dms}
