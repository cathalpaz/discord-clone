from ..models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_direct_messages():
    direct_message_1 = DirectMessage(
        user_from_id = 1,
        user_to_id = 2,
        content = 'Hello, how are you?'
    )
    direct_message_2 = DirectMessage(
        user_from_id = 2,
        user_to_id = 1,
        content = 'Gr8!'
    )
    direct_message_3 = DirectMessage(
        user_from_id = 2,
        user_to_id = 3,
        content = 'You got games on your phone?'
    )
    direct_message_4 = DirectMessage(
        user_from_id = 3,
        user_to_id = 2,
        content = 'Nah bro.'
    )

    db.session.add(direct_message_1)
    db.session.add(direct_message_2)
    db.session.add(direct_message_3)
    db.session.add(direct_message_4)

    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
