from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ENUM  # for future implementation
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# status is an enum we need to implement


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_to = db.Column(db.Integer)
    user_from = db.Column(db.Integer)
    status = db.Column(db.String(50), default="PENDING")
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(
    ), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_to': self.user_to,
            'user_from': self.user_from,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
