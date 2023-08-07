from ..models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_direct_messages():
    direct_message_1 = DirectMessage(
        user_from_id = 1,
        user_to_id = 2,
        content = 'Hello, how are you?'
    )
    direct_message_2 = DirectMessage(
        user_from_id = 1,
        user_to_id = 3,
        content = 'What are you doing later?'
    )
    direct_message_3 = DirectMessage(
        user_from_id = 2,
        user_to_id = 1,
        content = 'Gr8!'
    )
    direct_message_4 = DirectMessage(
        user_from_id = 3,
        user_to_id = 1,
        content = 'Nada'
    )
    direct_message_5 = DirectMessage(
        user_from_id = 1,
        user_to_id = 3,
        content = 'K.'
    )
    direct_message_6 = DirectMessage(
        user_from_id = 1,
        user_to_id = 5,
        content = 'Hello friend'
    )
    direct_message_7 = DirectMessage(
        user_from_id = 5,
        user_to_id = 1,
        content = 'wassup'
    )
    direct_message_8 = DirectMessage(
        user_from_id = 2,
        user_to_id = 4,
        content = 'Answer me pls'
    )

    db.session.add(direct_message_1)
    db.session.add(direct_message_2)
    db.session.add(direct_message_3)
    db.session.add(direct_message_4)
    db.session.add(direct_message_5)
    db.session.add(direct_message_6)
    db.session.add(direct_message_7)
    db.session.add(direct_message_8)

    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
