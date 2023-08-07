from ..models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channels():
    channels = [
        {'server_id': 1, 'type': 'text', "name": "general"},
        {'server_id': 2, 'type': 'text', "name": "general"},
        {'server_id': 3, 'type': 'text', "name": "general"},
        {'server_id': 4, 'type': 'text', "name": "general"},
        {'server_id': 5, 'type': 'text', "name": "general"},
        {'server_id': 6, 'type': 'text', "name": "general"},
        {'server_id': 7, 'type': 'text', "name": "general"},
        {'server_id': 8, 'type': 'text', "name": "general"},
        {'server_id': 9, 'type': 'text', "name": "general"},
        {'server_id': 10, 'type': 'text', "name": "general"},
        {'server_id': 1, 'type': 'text', "name": "food"},
        {'server_id': 1, 'type': 'text', "name": "gaming"},
        {'server_id': 1, 'type': 'text', "name": "music"},
        {'server_id': 1, 'type': 'text', "name": "tech-talk"},
        {'server_id': 2, 'type': 'text', "name": "off-topic"},
        {'server_id': 2, 'type': 'text', "name": "favorite-games"},
        {'server_id': 2, 'type': 'text', "name": "release-dates"},
        {'server_id': 2, 'type': 'text', "name": "memes"},
        {'server_id': 3, 'type': 'text', "name": "coding-challenges"},
        {'server_id': 3, 'type': 'text', "name": "help-and-support"},
        {'server_id': 3, 'type': 'text', "name": "python-chat"},
        {'server_id': 3, 'type': 'text', "name": "javascript-chat"},
        {'server_id': 4, 'type': 'text', "name": "off-topic"},
        {'server_id': 4, 'type': 'text', "name": "lecture-questions"},
        {'server_id': 4, 'type': 'text', "name": "reports-reminder"},
        {'server_id': 5, 'type': 'text', "name": "cybersecurity-news"},
        {'server_id': 5, 'type': 'text', "name": "memes"},
        {'server_id': 5, 'type': 'text', "name": "tools-and-resources"},
        {'server_id': 6, 'type': 'text', "name": "routines"},
        {'server_id': 6, 'type': 'text', "name": "pr-flex"},
        {'server_id': 7, 'type': 'text', "name": "recipes"},
        {'server_id': 7, 'type': 'text', "name": "off-topic"},
        {'server_id': 8, 'type': 'text', "name": "politics"},
        {'server_id': 8, 'type': 'text', "name": "weather"},
        {'server_id': 8, 'type': 'text', "name": "recent-news"},
        {'server_id': 9, 'type': 'text', "name": "upcoming-shows"},
        {'server_id': 9, 'type': 'text', "name": "jokes"},
        {'server_id': 10, 'type': 'text', "name": "recommendations"},
        {'server_id': 10, 'type': 'text', "name": "deals"},
        {'server_id': 11, 'type': 'text', "name": "general"},
        {'server_id': 11, 'type': 'text', "name": "frontend-problems"},
        {'server_id': 11, 'type': 'text', "name": "backend-problems"},
    ]

    for data in channels:
        channel = Channel(**data)
        db.session.add(channel)

    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
