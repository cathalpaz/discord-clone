
import pytest
from app.models import User, Server
from . import test_app, test_db


def test_new_server(test_db):
    user = User.query.get(1)
    server = Server(name="Test Server", owner_id=user.id)
    test_db.session.add(server)
    test_db.session.commit()


def test_to_dict(test_db):
    server = Server.query.get(1)
    server_dict = server.to_dict()
    print(server_dict)

    assert server_dict['id'] == server.id
    assert server_dict['name'] == server.name
    assert server_dict['avatar'] == server.avatar
    assert server_dict['owner_id'] == server.owner_id
    assert server_dict['created_at'] == server.created_at
    assert 'channels' in server_dict
    assert 'owner' in server_dict
    assert 'server_profiles' in server_dict


def test_to_dict_basic(test_db):
    server = Server.query.get(1)
    server_dict = server.to_dict_basic()

    assert server_dict['id'] == server.id
    assert server_dict['name'] == server.name
    assert server_dict['avatar'] == server.avatar
    assert server_dict['owner_id'] == server.owner_id
    assert server_dict['created_at'] == server.created_at
    assert 'owner' in server_dict
