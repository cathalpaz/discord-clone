from ..models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channels():
    channels = [
        {'server_id': 1, 'type': 'text', "name": "General"},
        {'server_id': 2, 'type': 'text', "name": "General"},
        {'server_id': 3, 'type': 'text', "name": "General"},
        {'server_id': 1, 'type': 'text', "name": "Off-Topic"},
        {'server_id': 2, 'type': 'text', "name": "Memes"},
        {'server_id': 3, 'type': 'text', "name": "animals"},
        {'server_id': 1, 'type': 'text', "name": "Music"},
        {'server_id': 2, 'type': 'text', "name": "Sports"},
        {'server_id': 3, 'type': 'text', "name": "Movies"},
        {'server_id': 1, 'type': 'text', "name": "Gaming"},
        {'server_id': 2, 'type': 'text', "name": "Books"},
        {'server_id': 3, 'type': 'text', "name": "Travel"},
        {'server_id': 1, 'type': 'text', "name": "Tech-Talk"},
        {'server_id': 2, 'type': 'text', "name": "Photography"},
        {'server_id': 3, 'type': 'text', "name": "Art"},
        {'server_id': 1, 'type': 'text', "name": "Food"},
        {'server_id': 2, 'type': 'text', "name": "Fitness"},
        {'server_id': 3, 'type': 'text', "name": "Space"},
        {'server_id': 1, 'type': 'text', "name": "Science"},
        {'server_id': 2, 'type': 'text', "name": "Education"},
        {'server_id': 3, 'type': 'text', "name": "Politics"},
        {'server_id': 1, 'type': 'text', "name": "News"},
    ]

    for data in channels:
        channel = Channel(**data)
        db.session.add(channel)

    db.session.commit()
