from ..models import db, ServerProfile, environment, SCHEMA
from sqlalchemy.sql import text

def seed_server_profiles():
    server_profile_1 = ServerProfile(
        user_id = 1,
        server_id = 1,
        banner_color = '#00FFFF'
    )
    server_profile_2 = ServerProfile(
        user_id = 2,
        server_id = 1,
        banner_color = '#FAFAFA',
        nickname = 'THE BOSS'
    )
    server_profile_3 = ServerProfile(
        user_id = 3,
        server_id = 2,
        banner_color = '#FF00FF'
    )
    server_profile_4 = ServerProfile(
        user_id = 4,
        server_id = 5,
        banner_color = '#00FFFF',
        nickname = 'Cool nickname'
    )
    server_profile_5 = ServerProfile(
        user_id = 5,
        server_id = 6,
        banner_color = '#00FFFF',
        nickname = 'that guy'
    )
    server_profile_6 = ServerProfile(
        user_id = 6,
        server_id = 7,
        banner_color = '#FAFAFA'
    )

    db.session.add(server_profile_1)
    db.session.add(server_profile_2)
    db.session.add(server_profile_3)
    db.session.add(server_profile_4)
    db.session.add(server_profile_5)
    db.session.add(server_profile_6)

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_profiles"))

    db.session.commit()
