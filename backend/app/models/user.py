from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import DateTime
from datetime import datetime
from .server_invite import ServerInvite


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())
    # 11/11/1996 would be a valid birthday
    birthday = db.Column(db.String(12), nullable=False)
    #  hexcidemal colors are valid #FAFAFA
    banner_color = db.Column(db.String(7), default="#FAFAFA")
    bio = db.Column(db.String(255), default="")
    pronouns = db.Column(db.String(255), nullable=False)
    # contains user profile image
    # TODO: setup a proper default avatar image in AWS
    avatar = db.Column(db.String(255), default="test.png")
    updated_at = db.Column(DateTime, default=datetime.utcnow())

    # relationships

    servers = db.relationship(
        "Server", secondary='users_servers', back_populates='users')

    # server_profiles = db.relationship("ServerProfile")

    server_invites_received = db.relationship(
        "ServerInvite", back_populates='user', foreign_keys=[ServerInvite.user_id])
    server_invites_sent = db.relationship(
        "ServerInvite", back_populates='user', foreign_keys=[ServerInvite.owner_id])

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @property
    def pronoun(self):
        return self.pronoun

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_extra(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'birthday': self.birthday,
            'banner_color': self.banner_color,
            'avatar': self.avatar,
            'bio': self.bio,
            'created_at': self.created_at
        }

    def to_dict_servers(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'birthday': self.birthday,
            'banner_color': self.banner_color,
            'avatar': self.avatar,
            'bio': self.bio,
            'created_at': self.created_at,
            "servers": [server.to_dict() for server in self.servers]
        }
# only shows server invites that have a status of PENDING

    def to_dict_server_invites_received(self):
        return {
            "server_invites_received": [server_invite.to_dict()
                                        for server_invite in self.server_invites_received
                                        if server_invite.status != "ACCEPTED"
                                        or server_invite.status != 'REJECTED']
        }
