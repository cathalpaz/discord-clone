import os
from .models import DirectMessage
from . import app
from flask_socketio import SocketIO, emit, send

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://slacord.onrender.com",
        "https://slacord.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)
socketio.init_app(app)

# handle chat messages
@socketio.on("connect")
def connection(data):
    print("User connected!")

@socketio.on("chat")
def handle_chat(data):
    print("THIS WAS HIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    # if data != "User connected!":
        # dm = DirectMessage (
    #         sender_id=data['sender_id'],
    #         recipient_id=data['recipient_id'],
    #         message=data['msg'],
    #         sent_at="hi"
    #     )
    #     db.session.add(dm)
    #     db.session.commit()

    emit("chat", data, broadcast=True)

# socketio.run(app)
if __name__ == "__main__":
    socketio.run(app)
