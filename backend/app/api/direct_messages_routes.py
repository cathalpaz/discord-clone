from flask import Blueprint
from flask_login import current_user, login_required
from ..models import DirectMessage, User, Friend
from sqlalchemy import or_, and_

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


# GET all friends
@direct_messages_routes.route('/friends')
@login_required
def all_friends():
    get_friends = Friend.query.filter(or_(
        Friend.user_to == current_user.id,
        Friend.user_from == current_user.id
    )).all()
    friends = [friend.to_dict() for friend in get_friends if friend.status == 'FRIENDS']
    return {'friends': friends}


# CREATE new direct message
