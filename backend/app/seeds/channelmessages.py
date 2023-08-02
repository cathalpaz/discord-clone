from ..models import db, environment, SCHEMA
from ..models.channel import ChannelMessage, Channel
from ..models.server import Server
from sqlalchemy.sql import text
from random import randint


def seed_channel_messages():
    # sample_messages = [
    #     {'channel_id': 1, 'user_id': 1,
    #         'content': 'Howdy doodly neigihborino, how are you?', 'updated': False},
    #     {'channel_id': 1, 'user_id': 2,
    #         'content': 'I am doin mighty fine!', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3, 'content': 'Hows it going?', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again, again, again', 'updated': True},
    # ]

    # for data in sample_messages:
    #     message = ChannelMessage(**data)
    #     db.session.add(message)

    # db.session.commit()

    random_content = [
        "Hello, world!",
        "Hi there!",
        "How's the weather?",
        "Goodbye",
        "Neat app"
    ]

    server_1 = Server.query.get(1)
    if server_1:
        for channel in server_1.channels:
            new_message = ChannelMessage(
                user_id=1, content=random_content[randint(0, len(random_content) - 1)])
            new_message_2 = ChannelMessage(
                user_id=1, content=random_content[randint(0, len(random_content) - 1)], updated=True)
            new_message_3 = ChannelMessage(user_id=2, content="Hi, Demo!")
            channel.channel_messages.append(new_message)
            channel.channel_messages.append(new_message_2)
            channel.channel_messages.append(new_message_3)
            db.session.commit()


def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
