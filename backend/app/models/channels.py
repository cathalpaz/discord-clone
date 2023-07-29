from . import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ENUM  # !!! for future implementation
from flask_sqlalchemy import SQLAlchemy


# !!! type is a enum that needs to be worked on
class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))
    type = db.Column(db.String(50))
    name = db.Column(db.String(50), nullable=False)
    channel_messages = db.relationship(
        "ChannelMessage", back_populates='channel')

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'type': self.type,
            "name": self.name,
            "messages": [message.to_dict() for message in self.channel_messages]
        }


class ChannelMessage(db.Model):
    __tablename__ = "channel_messages"

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    content = db.Column(db.String(4000))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(
    ), onupdate=db.func.current_timestamp())
    updated = db.Column(db.Boolean)
    channel = db.relationship("Channel", back_populates="channel_messages")

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
