import pytest
from sqlalchemy.exc import IntegrityError
from app.models import User
from . import test_app, test_db


def test_new_user(test_db):
    user = User(username="test", email='test@test.com',
                password='apples', birthday='11/11/1996', pronouns='he')
    test_db.session.add(user)
    test_db.session.commit()


def test_username_uniqueness(test_db):

    user1 = User(username="testxac", email='test@texkcjfst.com',
                 password='apples', birthday='11/11/1996', pronouns='he')
    user2 = User(username="testxac", email='test@tes2t.com',
                 password='apples', birthday='11/11/1996', pronouns='he')
    test_db.session.add(user1)

    with pytest.raises(IntegrityError):
        test_db.session.add(user2)
        test_db.session.commit()


def test_to_dict(test_db):
    user = User.query.get(1)

    user_dict = user.to_dict()
    assert user_dict['id'] == user.id
    assert user_dict['username'] == user.username
    assert user_dict['email'] == user.email


def test_email_uniqueness(test_db):
    user1 = User(username="testuser1", email='test@test.com',
                 password='password', birthday='01/01/2001', pronouns='he')
    user2 = User(username="testuser2", email='test@test.com',
                 password='password', birthday='01/01/2001', pronouns='she')
    test_db.session.add(user1)

    with pytest.raises(IntegrityError):
        test_db.session.add(user2)
        test_db.session.commit()


def test_check_password(test_db):
    user = User(username="testuser", email='testuser@test.com',
                password='password', birthday='01/01/2001', pronouns='they')
    test_db.session.add(user)
    test_db.session.commit()

    user_db = User.query.get(user.id)
    assert user_db.check_password('password') == True
    assert user_db.check_password('wrongpassword') == False


def test_to_dict_extra(test_db):
    user = User.query.get(1)
    user_dict = user.to_dict_extra()

    assert user_dict['id'] == user.id
    assert user_dict['username'] == user.username
    assert user_dict['email'] == user.email
    assert user_dict['birthday'] == user.birthday
    assert user_dict['banner_color'] == user.banner_color
    assert user_dict['avatar'] == user.avatar
    assert user_dict['bio'] == user.bio
    assert user_dict['created_at'] == user.created_at


def test_to_dict_servers(test_db):
    user = User.query.get(1)
    user_dict = user.to_dict_servers()

    assert user_dict['id'] == user.id
    assert user_dict['username'] == user.username
    assert user_dict['email'] == user.email
    assert user_dict['birthday'] == user.birthday
    assert user_dict['banner_color'] == user.banner_color
    assert user_dict['avatar'] == user.avatar
    assert user_dict['bio'] == user.bio
    assert user_dict['created_at'] == user.created_at
    assert 'servers' in user_dict


def test_to_dict_server_invites_received(test_db):
    user = User.query.get(1)
    user_dict = user.to_dict_server_invites_received()

    assert 'server_invites_received' in user_dict
