from ..models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channels = [
        {'server_id': 1, 'type': 'text'},
        {'server_id': 1, 'type': 'voice'},
        {'server_id': 1, 'type': 'video'},
        {'server_id': 2, 'type': 'text'},
        {'server_id': 2, 'type': 'voice'},
        {'server_id': 2, 'type': 'video'},
        {'server_id': 3, 'type': 'text'},
        {'server_id': 3, 'type': 'voice'},
        {'server_id': 3, 'type': 'video'},
    ]

    for data in channels:
        channel = Channel(**data)
        db.session.add(channel)

    db.session.commit()
