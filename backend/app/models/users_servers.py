from . import db, environment, SCHEMA


if environment == 'production':
    schema = SCHEMA
else:
    schema = None

users_servers = db.Table("users_servers",
                         db.Column("user_id", db.Integer,
                                   db.ForeignKey("users.id")),
                         db.Column("server_id", db.Integer,
                                   db.ForeignKey("servers.id")),
                         schema=schema
                         )
