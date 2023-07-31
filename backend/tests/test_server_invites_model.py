
import pytest
from app.models import ServerInvite, User
from . import test_db, test_app


def test_new_server_invite(test_db):
    server_invite = ServerInvite(
        server_id=1, user_id=2, owner_id=1, status='PENDING')

    test_db.session.add(server_invite)
    test_db.session.commit()

    server_invite_test = ServerInvite.query.get(server_invite.id)

    assert server_invite_test.server_id == 1
    assert server_invite_test.user_id == 2
    assert server_invite_test.owner_id == 1
    assert server_invite_test.status == 'PENDING'


def test_to_dict(test_db):
    server_invite = ServerInvite(
        server_id=1, user_id=2, owner_id=1, status='PENDING')

    test_db.session.add(server_invite)
    test_db.session.commit()

    server_invite_dict = server_invite.to_dict()

    assert server_invite_dict['id'] == server_invite.id
    assert server_invite_dict['server_id'] == 1
    assert server_invite_dict['user_id'] == 2
    assert server_invite_dict['status'] == 'PENDING'


def test_user_relationship(test_db):
    user = User(username='Test User123', password='password',
                email='test123@abc', pronouns='', birthday='11/11/1996')

    test_db.session.add(user)
    # gotta use flush or user id will not actually be generated
    test_db.session.flush()

    server_invite = ServerInvite(server_id=1, user_id=user.id, owner_id=1)

    test_db.session.add(server_invite)
    test_db.session.commit()

    assert server_invite.user.id == user.id
