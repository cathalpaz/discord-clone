import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/SendMessage.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SendMessage({ socket }) {
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const singleServer = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  const typingTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopTypingScheduled, setIsStopTypingScheduled] = useState(false);
  useEffect(() => {
    if (message) {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit("channel-typing", {
          user_id: user.id,
          channel_id: channelId,
          server_id: serverId,
          typing: true,
          username: user.username,
        });
      }
      if (!isStopTypingScheduled) {
        setIsStopTypingScheduled(true);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setIsStopTypingScheduled(false);
          socket.emit("channel-typing", {
            user_id: user.id,
            channel_id: channelId,
            server_id: serverId,
            typing: false,
            username: user.username,
          });
        }, 5000);
      }
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        setIsStopTypingScheduled(false);
      }
      if (isTyping) {
        setIsTyping(false);
        socket.emit("channel-typing", {
          user_id: user.id,
          channel_id: channelId,
          server_id: serverId,
          typing: false,
          username: user.username,
        });
      }
    }
  }, [message, channelId, user]);

  useEffect(() => {
    if (!socket) return;
    setIsTyping(false);
    socket.emit("channel-typing", {
      user_id: user.id,
      channel_id: channelId,
      server_id: serverId,
      typing: false,
    });
  }, [channelId]);

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
    setIsTyping(false);
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
            if (e.key === "Enter" && message.trim() !== "") {
              handleSendMessage();
            }
          }}
        ></input>
      ) : null}
    </div>
  );
}
