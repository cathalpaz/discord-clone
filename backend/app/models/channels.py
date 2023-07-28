from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ENUM #!!! for future implementation
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


# !!! type is a enum that needs to be worked on
class Channel(db.Model):
    __tablename__ = "channels"

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer)
    type = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'type': self.type,
        }

class ChannelMessage(db.Model):
    __tablename__ = "channelmessages"

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    content = db.Column(db.String(4000))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    updated = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'updated': self.updated,
        }
