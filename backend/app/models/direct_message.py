from .db import db, environment, SCHEMA
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.Datetime, default=datetime.utcnow())
    updated_at = db.Column(db.Datetime, default=datetime.utcnow())
    updated = db.Column(db.Boolean, nullable=False, default=False)


    # relationship to user
    user = db.relationship('User', back_populates='direct_messages')



    def to_dict(self):
        return {
            'id': self.id,
            'user_from_id': self.user_from_id,
            'user_to_id': self.user_to_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'updated': self.updated,
        }
