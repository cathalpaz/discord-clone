from ..models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server_1 = Server(
        name = 'Demo Server',
        avatar = 'test.png',
        owner_id = 1,
    )

    server_2 = Server(
        name = 'Gaming',
        avatar = 'test1.jpg',
        owner_id = 3,

    )

    server_3 = Server(
        name = 'Programming',
        avatar = 'test3.png',
        owner_id = 2,
    )

    db.session.add(server_1)
    db.session.add(server_2)
    db.session.add(server_3)

    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
