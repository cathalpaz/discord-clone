from ..models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():
    friends = []

    for i in range(2, 8):
        friend = Friend(user_to=1, user_from=i, status="ACCEPTED")
        friends.append(friend)

    for friend in friends:
        print(
            f"User from: {friend.user_from}, User to: {friend.user_to}, Status: {friend.status}")
        db.session.add(friend)
    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
