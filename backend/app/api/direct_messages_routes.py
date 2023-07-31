from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, DirectMessage, User, Friend
from sqlalchemy import or_, and_
from ..forms import UserMessage
from ..errors import NotFoundError, ForbiddenError

direct_messages_routes = Blueprint(
    'direct_messages', __name__, url_prefix='/@me')


# GET all user direct messages
@direct_messages_routes.route('')
@login_required
def all_direct_messages():
    get_dms = DirectMessage.query.filter(or_(
        DirectMessage.user_from_id == current_user.id,
        DirectMessage.user_to_id == current_user.id,
    )).all()
    dms = [dm.to_dict() for dm in get_dms]
    return {'messages': dms}


# GET single direct message
@direct_messages_routes.route('/<int:id>')
@login_required
def single_direct_message(id):
    dm = DirectMessage.query.get(id)
    if not dm:
        not_found_error = NotFoundError("Message not found")
        return not_found_error.error_json()
    return {'message': dm.to_dict()}

# GET all friends
@direct_messages_routes.route('/friends')
@login_required
def all_friends():
    get_friends = Friend.query.filter(or_(
        Friend.user_to == current_user.id,
        Friend.user_from == current_user.id
    )).all()
    friends = [friend.to_dict()
               for friend in get_friends if friend.status == 'ACCEPTED']
    return {'friends': friends}


# GET DMS from a specific friend
@direct_messages_routes.route('/friends/<int:id>')
@login_required
def get_friend_messages(id):
    dms = DirectMessage.query.filter(
        or_(
            and_(
                DirectMessage.user_from_id == current_user.id,
                DirectMessage.user_to_id == id
            ),
            and_(
                DirectMessage.user_from_id == id,
                DirectMessage.user_to_id == current_user.id
            )
        )
    ).all()
    if not dms:
        not_found_error = NotFoundError("Messages not found")
        return not_found_error.error_json()
    return {"messages": [dm.to_dict() for dm in dms]}


# CREATE new direct message
# TODO: double check to see if message history already exists
@direct_messages_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_direct_message(id):
    form = UserMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_dm = DirectMessage(
            user_from_id=current_user.id,
            user_to_id=id,
            content=form.data['content']
        )
        db.session.add(new_dm)
        db.session.commit()
        return {'message': new_dm.to_dict()}

    if form.errors:
        return {'errors': form.errors}


# UPDATE single direct message
@direct_messages_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_direct_message(id):
    form = UserMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    dm = DirectMessage.query.get(id)
    if dm.user_from_id != current_user.id:
        forbidden_error = ForbiddenError(
            "You do not have permission to edit this message!")
        return forbidden_error.error_json()

    if form.validate_on_submit():
        dm.content = form.data['content']
        dm.updated = True
        db.session.commit()
        return {'message': dm.to_dict()}

    if form.errors:
        return {'errors': form.errors}

# DELETE direct message
@direct_messages_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_direct_message(id):
    dm = DirectMessage.query.get(id)
    if not dm:
        not_found_error = NotFoundError("Message not found")
        return not_found_error.error_json()

    if dm.user_from_id != current_user.id:
        forbidden_error = ForbiddenError(
            "You do not have permission to delete this message!")
        return forbidden_error.error_json()

    db.session.delete(dm)
    db.session.commit()
    return {'message': 'Message successfully deleted'}
