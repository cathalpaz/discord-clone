from ..models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server_1 = Server(
        name='Demo Server',
        owner_id=1,
        public=True
    )
    server_2 = Server(
        name='Gaming',
        owner_id=3,
        public=True
    )
    server_3 = Server(
        name='Programming',
        owner_id=2,
    )
    server_4 = Server(
        name='App Academy',
        owner_id=4,
        public=True
    )
    server_5 = Server(
        name="Hackers' Hideout",
        owner_id=5,
    )
    server_6 = Server(
        name='Fitness Fanatics',
        owner_id=6,
        public=True
    )
    server_7 = Server(
        name='Foodies',
        owner_id=7,
        public=True
    )
    server_8 = Server(
        name='Tech-Free Zone',
        owner_id=8,
    )
    server_9 = Server(
        name='Comedy Central',
        owner_id=9,
        public=True
    )
    server_10 = Server(
        name='Travel Tips',
        owner_id=10,
        public=True
    )
    server_11 = Server(
        name='Slacord Team',
        owner_id=1,
        public=True
    )

    db.session.add(server_1)
    db.session.add(server_2)
    db.session.add(server_3)
    db.session.add(server_4)
    db.session.add(server_5)
    db.session.add(server_6)
    db.session.add(server_7)
    db.session.add(server_8)
    db.session.add(server_9)
    db.session.add(server_10)
    db.session.add(server_11)

    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
