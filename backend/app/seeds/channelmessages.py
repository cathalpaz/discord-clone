from ..models import db, environment, SCHEMA
from ..models.channel import ChannelMessage
from sqlalchemy.sql import text


def seed_channel_messages():
    sample_messages = [
        {'channel_id': 1, 'user_id': 1,
            'content': 'Howdy doodly neigihborino, how are you?', 'updated': False},
        {'channel_id': 1, 'user_id': 2,
            'content': 'I am doin mighty fine!', 'updated': False},
        {'channel_id': 2, 'user_id': 3, 'content': 'Hows it going?', 'updated': False},
        {'channel_id': 2, 'user_id': 3,
            'content': 'Im talking to myself!', 'updated': False},
    ]

    for data in sample_messages:
        message = ChannelMessage(**data)
        db.session.add(message)

    db.session.commit()


def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
