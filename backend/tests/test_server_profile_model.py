
import pytest
from sqlalchemy.exc import IntegrityError
from app.models import ServerProfile
from . import test_db, test_app


def test_server_profile_create(test_db):
    server_profile = ServerProfile(
        user_id=20, server_id=1, banner_color="#FAFAFA", nickname="nickname")
    test_db.session.add(server_profile)
    test_db.session.commit()

    assert server_profile in test_db.session


def test_server_profile_unique(test_db):
    server_profile1 = ServerProfile(
        user_id=1, server_id=1, banner_color="#FAFAFA", nickname="nickname")
    server_profile2 = ServerProfile(
        user_id=1, server_id=1, banner_color="#FAFAFA", nickname="nickname")
    test_db.session.add(server_profile1)
    with pytest.raises(IntegrityError):
        test_db.session.add(server_profile2)
        test_db.session.commit()


def test_server_profile_to_dict(test_db):
    server_profile = ServerProfile.query.get(1)

    server_profile_dict = server_profile.to_dict()
    assert server_profile_dict['id'] == server_profile.id
    assert server_profile_dict['user_id'] == server_profile.user_id
    assert server_profile_dict['server_id'] == server_profile.server_id
    assert server_profile_dict['banner_color'] == server_profile.banner_color
    assert server_profile_dict['nickname'] == server_profile.nickname
    assert server_profile_dict['created_at'] == server_profile.created_at
    assert server_profile_dict['updated_at'] == server_profile.updated_at
