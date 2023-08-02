import React, { useState } from 'react'
import "../../styles/components/SendMessage.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SendMessage({ socket }) {
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const singleServer = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  if (!socket || !user) return false;

  const handleSendMessage = () => {
    socket.emit("channel_message", {
      message,
      channel_id: channelId,
      user: {
        id: user.id,
        username: user.username,
      },
      server_id: serverId,
    });
    setMessage("");
  };

  return (
    <div className='send-message-container'>
      {singleServer.channels[channelId]?.name != undefined ? (
        <input
          className='send-message-input'
          type='textbox'
          placeholder={`Message #${singleServer.channels[channelId].name}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        ></input>
      ) : null}
    </div>
  );
}
