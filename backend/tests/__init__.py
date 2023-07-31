import pytest
from flask_sqlalchemy import SQLAlchemy
from app import create_app
from app.seeds.users import seed_users
from app.seeds.servers import seed_servers
from app.seeds.server_profiles import seed_server_profiles


@pytest.fixture(scope='module')
def test_app():
    app, db = create_app(test=True)
    with app.app_context():
        yield app, db


@pytest.fixture(scope='function')
def test_db(test_app):
    app, db = test_app
    db.create_all()
    seed_users()
    seed_servers()
    seed_server_profiles()
    yield db
    db.session.rollback()
    db.drop_all()
