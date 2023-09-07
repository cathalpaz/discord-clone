import os
from .models import DirectMessage, ChannelMessage, Channel, db, User
from flask_socketio import SocketIO, emit, send
from datetime import datetime
from flask_login import current_user
from datetime import datetime
import pytz


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://slacord.onrender.com",
        "https://slacord.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages


@socketio.on("connect")
def connection(data):
    print("User connected!")
    print("THIS IS THE DATA", data)
# TODO needs error handling


@socketio.on("dm-sent")
def handle_dm(dm):
    print("DM RECEIVED", dm)
    emit(f"user-dm-{dm['message']['user_to_id']}", dm, broadcast=True)

# TODO not very secure way to do this, fix it if you got the time


@socketio.on("user_connected")
def user_connected(user_id):
    user = User.query.get(user_id)
    if user:
        user.last_seen = datetime.utcnow()
        emit("user_status", {
            'user_id': user.id,
            'status': 'online'
        }, broadcast=True)


@socketio.on("chat")
def handle_chat(data):
    print("THIS WAS HIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    # if data != "User connected!":
    # dm = DirectMessage (
    #         sender_id=data['sender_id'],
    #         recipient_id=data['recipient_id'],
    #         message=data['msg'],
    #         sent_at="hi"
    #     )
    #     db.session.add(dm)
    #     db.session.commit()

    emit("chat", data, broadcast=True)


# ! make sure to implement permission checks
@socketio.on("channel_message")
def handle_channel_message(data):
    print(f"User {data['user']['username']} sent channel Message")
    channel = Channel.query.get(data['channel_id'])
    if not channel:
        return
    # set user status
    user = User.query.get(data['user']['id'])
    if user:
        user.last_seen = datetime.utcnow()
    if 'new_message' in data:
        old_message = ChannelMessage.query.get(data['new_message']['id'])
        old_message.content = data['new_message']['content']
        old_message.updated = True
        db.session.commit()
        emit(f"server-channel-messages-{data['server_id']}", {
            'content': data['new_message']['content'],
             "created_at": datetime.utcnow().replace(tzinfo=pytz.utc).strftime("%Y-%m-%d %H:%M:%S %Z"),
             "user_id": data['user']['id'],
             "channel_id": data['channel_id'],
             "updated": True,
             "id": f"{old_message.id}"
             }, broadcast=True)
        return
    new_channel_message = ChannelMessage(
        content=data['message'], user_id=data['user']['id'])
    channel.channel_messages.append(new_channel_message)
    db.session.commit()
    # TODO FIX THIS UP
    emit(f"server-channel-messages-{data['server_id']}",
         {
             "content": data['message'],
             "created_at": datetime.utcnow().replace(tzinfo=pytz.utc).strftime("%Y-%m-%d %H:%M:%S %Z"),
             "user_id": data['user']['id'],
             "channel_id": data['channel_id'],
             "updated": False,
             'id': f"{new_channel_message.id}",
             'username': f"{user.username}"
         }, broadcast=True)
    emit(f"server-channel-messages-notifications-{data['server_id']}",
         {
             "user_id": data['user']['id'],
             "channel_id": data['channel_id'],
         }, broadcast=True)


@socketio.on("dm-typing")
def handle_dm_typing(data):
    print("THIS IS THE DATA", data)
    print(f"user: {data['user_id']} is typing: {data['typing']}")
    if int(data['other_user']) < int(data['user_id']):
        print("other user is less than")
        emit(f"user-dm-{data['other_user']}-{data['user_id']}-typing", {
            'username': data['username'],
            'typing': data['typing']
        }, broadcast=True)
    else:
        print("other user is greater than")
        emit(f"user-dm-{data['user_id']}-{data['other_user']}-typing", {
            'username': data['username'],
            'typing': data['typing']
        }, broadcast=True)
        pass
    emit(f"user-dm-{data['user_id']}-user-typing", {
        'username': data['username'],
        'typing': data['typing']
    }, broadcast=True)


@socketio.on("server-channel-messages-delete")
def handle_delete_message(data):
    message_id = data['message_id']
    channel_id = data['channel_id']
    server_id = data['server_id']
    emit(f"server-channel-messages-delete-{server_id}", {
        'messageId': message_id,
        "channelId": channel_id
    }, broadcast=True)


@socketio.on("channel-typing")
def handle_user_typing(data):
    print("THIS IS THE DATA", data)
    print(f"user: {data['user_id']} is typing: {data['typing']}")
    emit(f"server-channel-{data['channel_id']}-user-typing", {
        'username': data['username'],
        'typing': data['typing']
    }, broadcast=True)
