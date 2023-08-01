from . import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ENUM  # for future implementation
from flask_sqlalchemy import SQLAlchemy
from .db import add_prefix_for_prod

# status is an enum we need to implement


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_to = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    user_from = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    status = db.Column(db.String(50), default="PENDING")
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(
    ), onupdate=db.func.current_timestamp())
    user_1 = db.relationship("User", foreign_keys=[user_to])
    user_2 = db.relationship("User", foreign_keys=[user_from])

    def to_dict(self, current_user_id):
        return {
            'id': self.id,
            'user_to': self.user_to,
            'user_from': self.user_from,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user_1.to_dict_extra() if current_user_id != self.user_1.id else self.user_2.to_dict_extra()
        }
