import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkSendDirectMessage } from "../../store/directMessages";
import "../../styles/components/SendMessage.css";

export default function DirectMessageSendMessage({ socket }) {
  if (!socket) return false;
  const { directMessageId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const otherUser = useSelector(
    (state) => state.directMessages.users[directMessageId]
  );
  if (!otherUser) return false;

  const handleSendMessage = async () => {
    const res = await dispatch(
      thunkSendDirectMessage(directMessageId, {
        content: message,
      })
    );
    if (res) {
      socket.emit("dm-sent", res);
    }
    setMessage("");
  };

  return (
    <div className="send-message-container">
      <input
        className="send-message-input"
        type="textbox"
        placeholder={`Message @${otherUser.username}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      ></input>
    </div>
  );
}
