from . import db, environment, SCHEMA
from datetime import datetime


class ServerInvite(db.Model):
    __tablename__ = "server_invites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # TODO make this a proper enum
    status = db.Column(db.String(20), default='PENDING')
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    server = db.relationship("Server", back_populates='server_invites')
    user = db.relationship(
        "User", back_populates='server_invites_received', foreign_keys=[user_id])
    owner = db.relationship("User", foreign_keys=[owner_id])

    def to_dict(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "user_id": self.user_id,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "server": self.server.to_dict_basic(),
        }
