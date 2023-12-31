from flask import Blueprint, request, make_response
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

    friends = [friend.to_dict(current_user.id)
               for friend in get_friends if friend.status == 'ACCEPTED' or friend.status == 'PENDING']

    return {'friends': friends}
# Send a friend request


@direct_messages_routes.route('/friends/<username>/send-request', methods=['POST'])
@login_required
def send_friend_request(username):
    other_user = User.query.filter(User.username == username).first()
    if not other_user:
        not_found_error = NotFoundError(f"{username} Not Found")
        return not_found_error.error_json()
    existing_request = Friend.query.filter(
        or_(
            and_(
                Friend.user_to == current_user.id,
                Friend.user_from == other_user.id
            ),
            and_(
                Friend.user_to == other_user.id,
                Friend.user_from == current_user.id
            )
        )
    ).first()
    # existing_request = Friend.query.filter(
    #     ((Friend.user_to == current_user.id) & (Friend.user_from == id)) |
    #     ((Friend.user_to == id) & (Friend.user_from == current_user.id))
    # ).first()

    if existing_request:
        forbidden_error = ForbiddenError("Friend request already sent")
        return forbidden_error.error_json()

    new_friend_request = Friend(
        user_to=other_user.id, user_from=current_user.id, status="PENDING")
    db.session.add(new_friend_request)
    db.session.commit()

    response_message = "Friend request has been sent"
    return {"friend": new_friend_request.to_dict(current_user.id)}

# Accept friend request


@direct_messages_routes.route('/friends/<username>/accept-request', methods=['POST'])
@login_required
def acceptd_friend_request(username):
    other_user = User.query.filter(User.username == username).first()
    if not other_user:
        not_found_error = NotFoundError(f"{username} Not Found")
        return not_found_error.error_json()
    existing_request = Friend.query.filter(
        or_(
            and_(
                Friend.user_to == current_user.id,
                Friend.user_from == other_user.id
            ),
            and_(
                Friend.user_to == other_user.id,
                Friend.user_from == current_user.id
            )
        )
    ).first()

    print(existing_request)
    if not existing_request:
        not_found_error = NotFoundError("Friend request not found")
        return not_found_error.error_json()
    existing_request.status = 'ACCEPTED'
    db.session.commit()
    return {"friend": existing_request.to_dict(current_user.id)}
    # raise ForbiddenError("Friend request already sent")

    # new_friend_request = Friend(
    #     user_to=id, user_from=current_user.id, status="ACCEPTED")
    # db.session.add(new_friend_request)
    # db.session.commit()

    # response_message = "Friend request has been sent"
    # return make_response(response_message, 200)

# GET DMS from a specific friend

# reject a friend request


@direct_messages_routes.route('/friends/<username>/reject-request', methods=['POST'])
@login_required
def reject_friend_request(username):
    other_user = User.query.filter(User.username == username).first()
    if not other_user:
        not_found_error = NotFoundError(f"{username} Not Found")
        return not_found_error.error_json()
    existing_request = Friend.query.filter(
        or_(
            and_(
                Friend.user_to == current_user.id,
                Friend.user_from == other_user.id
            ),
            and_(
                Friend.user_to == other_user.id,
                Friend.user_from == current_user.id
            )
        )
    ).first()

    print(existing_request)
    if not existing_request:
        not_found_error = NotFoundError("Friend request not found")
        return not_found_error.error_json()
    existing_request.status = 'REJECTED'
    db.session.commit()
    return {"friend": f"{existing_request.id}"}


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
