from ..models import db
from ..models import User, environment, SCHEMA
from ..models.server import Server
from ..models.user import User
from sqlalchemy.sql import text


def seed_users_servers():
    user_1 = User.query.filter(User.username == 'Demo').first()
    user_2 = User.query.filter(User.username == 'marnie').first()
    user_3 = User.query.filter(User.username == 'bobbie').first()
    user_4 = User.query.filter(User.username == 'kai').first()
    user_5 = User.query.filter(User.username == 'jayden').first()

    user_6 = User.query.filter(User.username == 'ezra').first()
    user_7 = User.query.filter(User.username == 'luca').first()
    user_8 = User.query.filter(User.username == 'nova').first()
    user_9 = User.query.filter(User.username == 'finn').first()
    user_10 = User.query.filter(User.username == 'eliana').first()
    user_11 = User.query.filter(User.username == 'rowan').first()

    user_12 = User.query.filter(User.username == 'amara').first()
    user_13 = User.query.filter(User.username == 'aaliyah').first()
    user_14 = User.query.filter(User.username == 'zion').first()
    user_15 = User.query.filter(User.username == 'maeve').first()
    user_16 = User.query.filter(User.username == 'kayden').first()
    user_17 = User.query.filter(User.username == 'mia').first()
    user_18 = User.query.filter(User.username == 'mila').first()
    user_19 = User.query.filter(User.username == 'aurora').first()
    user_20 = User.query.filter(User.username == 'alina').first()
    user_21 = User.query.filter(User.username == 'remi').first()
    user_22 = User.query.filter(User.username == 'amaya').first()
    user_23 = User.query.filter(User.username == 'ari').first()
    user_24 = User.query.filter(User.username == 'cathal').first()
    user_25 = User.query.filter(User.username == 'jason').first()
    user_26 = User.query.filter(User.username == 'jp').first()
    user_27 = User.query.filter(User.username == 'zachary').first()

    server_1 = Server.query.filter(Server.id == 1).first()
    server_2 = Server.query.filter(Server.id == 2).first()
    server_3 = Server.query.filter(Server.id == 3).first()
    server_4 = Server.query.filter(Server.id == 4).first()
    server_5 = Server.query.filter(Server.id == 5).first()
    server_6 = Server.query.filter(Server.id == 6).first()
    server_7 = Server.query.filter(Server.id == 7).first()
    server_8 = Server.query.filter(Server.id == 8).first()
    server_9 = Server.query.filter(Server.id == 9).first()
    server_10 = Server.query.filter(Server.id == 10).first()
    server_11 = Server.query.filter(Server.id == 11).first()

    if server_1:
        [server_1.users.append(user)
         for user in [user_1, user_2, user_3, user_4, user_5]]
        db.session.commit()

    if server_2:
        [server_2.users.append(user)
         for user in [user_1, user_6, user_7, user_8, user_9]]
        db.session.commit()

    if server_3:
        [server_3.users.append(user)
         for user in [user_1, user_2, user_3, user_4, user_5, user_6, user_7, user_8, user_9]]
        db.session.commit()

    if server_4:
        [server_4.users.append(user)
         for user in [user_11, user_24, user_25, user_26, user_27, user_15, user_12, user_22]]
        db.session.commit()

    if server_5:
        [server_5.users.append(user)
         for user in [user_2, user_6, user_7, user_8, user_10, user_5, user_4, user_8, user_9]]
        db.session.commit()

    if server_6:
        [server_6.users.append(user)
         for user in [user_21, user_15, user_16, user_12, user_6, user_7, user_9]]
        db.session.commit()

    if server_7:
        [server_7.users.append(user)
         for user in [user_3, user_4, user_5, user_6, user_7, user_8, user_9]]
        db.session.commit()

    if server_8:
        [server_8.users.append(user)
         for user in [user_18, user_19, user_20, user_21, user_22, user_23]]
        db.session.commit()

    if server_9:
        [server_9.users.append(user)
         for user in [user_10, user_22, user_23, user_24, user_5, user_6, user_7, user_8, user_9]]
        db.session.commit()

    if server_10:
        [server_10.users.append(user)
         for user in [user_11, user_12, user_13, user_14, user_15, user_16]]
        db.session.commit()

    if server_11:
        [server_11.users.append(user)
         for user in [user_1, user_24, user_25, user_26, user_27]]
        db.session.commit()


def undo_users_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users_servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_servers"))

    db.session.commit()
