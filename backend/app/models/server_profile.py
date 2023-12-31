from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ServerProfile(db.Model):
    __tablename__ = 'server_profiles'

    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'user_id', 'server_id', name='_user_server_uc'), {'schema': SCHEMA})
    else:
        __table_args__ = (db.UniqueConstraint(
            'user_id', 'server_id', name='_user_server_uc'),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), nullable=False)
    banner_color = db.Column(db.String)
    nickname = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    # server relationship
    server = db.relationship("Server", back_populates='server_profiles')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'banner_color': self.banner_color,
            'nickname': self.nickname,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
