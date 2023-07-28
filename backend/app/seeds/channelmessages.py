from ..models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channel_messages():
    sample_messages = [
        {'channel_id': 1, 'user_id': 1, 'content': 'Howdy doodly neigihborino, how are you?', 'updated': False},
        {'channel_id': 1, 'user_id': 2, 'content': 'I am doin mighty fine!', 'updated': False},
        {'channel_id': 2, 'user_id': 3, 'content': 'Hows it going?', 'updated': False},
        {'channel_id': 2, 'user_id': 3, 'content': 'Im talking to myself!', 'updated': False},
    ]

    for data in sample_messages:
        message = ChannelMessage(**data)
        db.session.add(message)

    db.session.commit()
