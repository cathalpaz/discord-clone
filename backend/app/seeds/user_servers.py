from ..models import db
from ..models.server import Server
from ..models.user import User


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

    server_1 = Server.query.filter(Server.id == 1).first()
    server_2 = Server.query.filter(Server.id == 2).first()
    server_3 = Server.query.filter(Server.id == 3).first()

    if server_1:
        [server_1.users.append(user)
         for user in [user_1, user_2, user_3, user_4, user_5]]
        db.session.commit()

    if server_2:
        [server_2.users.append(user)
         for user in [user_6, user_7, user_8, user_9]]
        db.session.commit()

    if server_3:
        [server_3.users.append(user)
         for user in [user_1, user_2, user_3, user_4, user_5, user_6, user_7, user_8, user_9]]
        db.session.commit()
