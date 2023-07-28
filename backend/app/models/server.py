from .db import db, environment, SCHEMA
from datetime import datetime


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    # owner = db.relationship('User', back_populates='servers')

    # channel relationship


    # server profiles relationship

    # server invites relationship


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar,
            'owner_id': self.owner_id,
            'created_at': self.created_at
        }