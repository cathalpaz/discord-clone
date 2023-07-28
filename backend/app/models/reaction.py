from .db import db, environment, SCHEMA


class ChannelMessageReaction(db.Model):
    __tablename__ = 'channel_message_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_message_id = db.Column(db.Integer, db.ForeignKey('channel_messages.id'), nullable=False)
    emoji = db.Column(db.String, nullable=False)

    # relationships


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_message_id': self.channel_message_id,
            'emoji': self.emoji,
        }

class DirectMessageReaction(db.Model):
    __tablename__ = 'direct_message_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    direct_message_id = db.Column(db.Integer, db.ForeignKey('direct_messages.id'), nullable=False)
    emoji = db.Column(db.String, nullable=False)

    # relationships


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_message_id': self.channel_message_id,
            'emoji': self.emoji,
        }
