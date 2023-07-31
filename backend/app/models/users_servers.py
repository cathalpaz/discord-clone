from . import db, environment, SCHEMA
from .db import add_prefix_for_prod


if environment == 'production':
    schema = SCHEMA
else:
    schema = None

users_servers = db.Table("users_servers",
                         db.Model.metadata,
                         db.Column("user_id", db.Integer,
                                   db.ForeignKey(add_prefix_for_prod("users.id"))),
                         db.Column("server_id", db.Integer,
                                   db.ForeignKey(add_prefix_for_prod("servers.id"))),
                         schema=schema
                         )
