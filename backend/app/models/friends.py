from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import ENUM #for future implementation
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Friends(db.Model):
    __tablename__ = "friends"
