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
    # TODO add this column to db diagram. It doesn't exist currently...
    public = db.Column(db.Boolean, default=False)

    owner = db.relationship('User')

    # users relationship
    users = db.relationship(
        'User', secondary='users_servers', back_populates='servers')

    # channel relationship
    channels = db.relationship("Channel", backref='server')
    # server profiles relationship
    server_profiles = db.relationship("ServerProfile", back_populates='server')

    # server invites relationship

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar,
            'owner_id': self.owner_id,
            'created_at': self.created_at,
            'channels': [channel.to_dict() for channel in self.channels],
            'owner': self.owner.to_dict(),
            'server_profiiles': [server_profile.to_dict() for server_profile in self.server_profiles]
        }
