from ..models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server_1 = Server(
        id=1,
        name='Demo Server',
        avatar='test.png',
        owner_id=1,
        public=True
    )

    server_2 = Server(
        id=2,
        name='Gaming',
        avatar='test1.jpg',
        owner_id=3,
        public=True
    )

    server_3 = Server(
        id=3,
        name='Programming',
        avatar='test3.png',
        owner_id=2,
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
