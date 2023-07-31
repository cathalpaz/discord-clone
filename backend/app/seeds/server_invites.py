
from ..models import db, User, environment, SCHEMA, ServerInvite, Server
from sqlalchemy.sql import text


def seed_server_invites():
    server_1 = Server.query.get(1)

    user_1 = User.query.filter(User.username == "remi").first()
    user_2 = User.query.filter(User.username == "alina").first()
    user_3 = User.query.filter(User.username == "amaya").first()
    user_4 = User.query.filter(User.username == "ari").first()
    user_5 = User.query.filter(User.username == "zion").first()

    user_sender = User.query.filter(User.username == "Demo").first()
# TODO add some error handling here

    for user in [user_1, user_2, user_3, user_4, user_5]:
        new_server_invite = ServerInvite(
            server_id=server_1.id,
            user_id=user.id,
            owner_id=user_sender.id
        )
        db.session.add(new_server_invite)
    db.session.commit()


def undo_server_invites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_invites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_invites"))

    db.session.commit()
