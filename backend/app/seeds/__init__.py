from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .user_servers import seed_users_servers, undo_users_servers
from .direct_messages import seed_direct_messages, undo_direct_messages
from .friends import seed_friends, undo_friends
from .channels import seed_channels, undo_channels
from .channelmessages import seed_channel_messages, undo_channel_messages
from .server_profiles import seed_server_profiles, undo_server_profiles
from .server_invites import seed_server_invites, undo_server_invites

from ..models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_direct_messages()
        undo_channel_messages()
        undo_channels()
        undo_server_profiles()
        undo_server_invites()
        undo_users_servers()
        undo_servers()
        undo_friends()
        undo_users()
    seed_users()
    seed_servers()
    seed_channels()
    seed_direct_messages()
    seed_users_servers()
    # Add other seed functions here
    seed_friends()
    seed_channel_messages()
    seed_server_profiles()
    seed_server_invites()

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_direct_messages()
    undo_users_servers()
    undo_servers()
    undo_users()
    # Add other undo functions here
    undo_server_invites()
    undo_friends()
    undo_channels()
    undo_channel_messages()
    undo_server_profiles()
