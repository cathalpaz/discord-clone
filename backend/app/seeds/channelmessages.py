from ..models import db, environment, SCHEMA
from ..models.channel import ChannelMessage, Channel
from ..models.server import Server
from sqlalchemy.sql import text
from random import randint


def seed_channel_messages():
    # sample_messages = [
    #     {'channel_id': 1, 'user_id': 1,
    #         'content': 'Howdy doodly neigihborino, how are you?', 'updated': False},
    #     {'channel_id': 1, 'user_id': 2,
    #         'content': 'I am doin mighty fine!', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3, 'content': 'Hows it going?', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again, again', 'updated': False},
    #     {'channel_id': 2, 'user_id': 3,
    #         'content': 'Im talking to myself!, again, again, again, again', 'updated': True},
    # ]

    # for data in sample_messages:
    #     message = ChannelMessage(**data)
    #     db.session.add(message)

    # db.session.commit()

    random_content = [
        "Hello, world!",
        "Hi there!",
        "How's the weather?",
        "Goodbye",
        "Neat app"
    ]

    server_1 = Server.query.get(1)
    if server_1:
        for channel in server_1.channels:
            new_message = ChannelMessage(
                user_id=1, content=random_content[randint(0, len(random_content) - 1)])
            new_message_2 = ChannelMessage(
                user_id=1, content=random_content[randint(0, len(random_content) - 1)], updated=True)
            new_message_3 = ChannelMessage(user_id=2, content="Hi, Demo!")
            channel.channel_messages.append(new_message)
            channel.channel_messages.append(new_message_2)
            channel.channel_messages.append(new_message_3)
            db.session.commit()


    message1 = ChannelMessage(
        channel_id=2, user_id=3, content='Wow this app is cool!'
    )
    message2 = ChannelMessage(
        channel_id=2, user_id=6, content='I <3 Video Games!', updated=True
    )
    message3 = ChannelMessage(
        channel_id=2, user_id=8, content='Playstation has always been better.'
    )
    message4 = ChannelMessage(
        channel_id=3, user_id=4, content='We hereeeeeeeee.'
    )
    message5 = ChannelMessage(
        channel_id=3, user_id=6, content='Here indeed'
    )
    message6 = ChannelMessage(
        channel_id=4, user_id=4, content='Project weeks are so fun!'
    )
    message7 = ChannelMessage(
        channel_id=4, user_id=15, content='right...'
    )
    message8 = ChannelMessage(
        channel_id=5, user_id=6, content='Beep Beep Boop', updated=True
    )
    message9 = ChannelMessage(
        channel_id=6, user_id=21, content='Hi gymrats!'
    )
    message10 = ChannelMessage(
        channel_id=7, user_id=7, content='Thinking about pizza...'
    )
    message11 = ChannelMessage(
        channel_id=8, user_id=18, content='How is everyone on this site?'
    )
    message12 = ChannelMessage(
        channel_id=9, user_id=10, content='Hope everyone here has a good sense of humor!'
    )
    message13 = ChannelMessage(
        channel_id=10, user_id=12, content='Going on vacation next week!', updated=True
    )


    message14 = ChannelMessage(
        channel_id=11, user_id=4, content='I am hungry.'
    )
    message15 = ChannelMessage(
        channel_id=11, user_id=5, content='Then eat???'
    )
    message16 = ChannelMessage(
        channel_id=12, user_id=3, content='Minecraft?'
    )
    message17 = ChannelMessage(
        channel_id=15, user_id=9, content='Meow', updated=True
    )
    message18 = ChannelMessage(
        channel_id=16, user_id=8, content='VALORANT NUMBER 1'
    )
    message19 = ChannelMessage(
        channel_id=19, user_id=3, content='two sum gotta be the hardest question'
    )
    message19 = ChannelMessage(
        channel_id=24, user_id=4, content='What is going on...'
    )
    message20 = ChannelMessage(
        channel_id=25, user_id=15, content='DONT FORGET REPORTS!'
    )
    message21 = ChannelMessage(
        channel_id=30, user_id=6, content='Hit 4 plates on bench, and 1 plate on squat.'
    )
    message22 = ChannelMessage(
        channel_id=31, user_id=7, content='Cereal recipe coming soon!'
    )
    message23 = ChannelMessage(
        channel_id=38, user_id=10, content='Places to visit in Antarctica?'
    )
    message24 = ChannelMessage(
        channel_id=39, user_id=13, content='I NEED SOME DEALS!'
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    db.session.add(message18)
    db.session.add(message19)
    db.session.add(message20)
    db.session.add(message21)
    db.session.add(message22)
    db.session.add(message23)
    db.session.add(message24)
    
    db.session.commit()



def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
