import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkSendDirectMessage } from "../../store/directMessages";
import "../../styles/components/SendMessage.css";

export default function DirectMessageSendMessage({ socket }) {
  if (!socket) return false;
  const { directMessageId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.session.user);
  const typingTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopTypingScheduled, setIsStopTypingScheduled] = useState(false);
  const otherUser = useSelector(
    (state) => state.directMessages.users[directMessageId]
  );
  if (!otherUser) return false;

  useEffect(() => {
    if (!socket) return;
    // socket.emit("dm-typing", {
    //   user_id: user.id,
    //   typing: true,
    //   username: user.username,
    // });

    if (message) {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit("dm-typing", {
          user_id: user.id,
          typing: true,
          username: user.username,
          other_user: directMessageId,
        });
      }
      if (!isStopTypingScheduled) {
        setIsStopTypingScheduled(true);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setIsStopTypingScheduled(false);
          socket.emit("dm-typing", {
            user_id: user.id,
            typing: false,
            username: user.username,
            other_user: directMessageId,
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
        socket.emit("dm-typing", {
          user_id: user.id,
          typing: false,
          username: user.username,
          other_user: directMessageId,
        });
      }
    }
  }, [message, user]);

  const handleSendMessage = async () => {
    setMessage("");
    const res = await dispatch(
      thunkSendDirectMessage(directMessageId, {
        content: message,
      })
    );
    if (res) {
      socket.emit("dm-sent", res);
    }
  };

  return (
    <div className='send-message-container'>
      <input
        className='send-message-input'
        type='textbox'
        placeholder={`Message @${otherUser.username}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim() !== "") {
            handleSendMessage();
          }
        }}
      ></input>
    </div>
  );
}
