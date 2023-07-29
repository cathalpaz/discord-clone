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
