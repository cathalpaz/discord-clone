import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ChannelMessage } from "./ChannelMessage";
import {
  deleteSingleChannelMessage,
  updateChannelMessages,
} from "../../store/singleServer";
import "../../styles/components/ChannelMessageList.css";

export function ChannelMessageList({ socket }) {
  const { channelId, serverId } = useParams();
  const user = useSelector((state) => state.session.user);
  const messageContainerRef = useRef(null);
  const [usersTyping, setUsersTyping] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(`server-channel-messages-${serverId}`, (data) => {
      dispatch(updateChannelMessages(data));
    });
    socket.on(`server-channel-messages-delete-${serverId}`, (data) => {
      const { messageId, channelId } = data;
      dispatch(deleteSingleChannelMessage(channelId, messageId));
    });
    socket.on(`server-channel-${channelId}-user-typing`, (data) => {
      if (data.typing === true) {
        setUsersTyping((prev) =>
          data.username === user.username ? [...prev] : [...prev, data.username]
        );
      } else {
        setUsersTyping((prev) =>
          prev.filter((username) => username !== data.username)
        );
      }
    });
    return () => {
      socket.off(`server-channel-messages-${serverId}`);
      socket.off(`server-channel-messages-delete-${serverId}`);
      socket.off(`server-channel-${channelId}-user-typing`);
    };
  }, [serverId, socket, channelId]);
  useEffect(() => {
    if (!socket) return;
    socket.on(`server-channel-messages-${serverId}`, (data) => {
      const existingTypingUser = usersTyping.find(
        (usr) => usr == data.username
      );
      console.log("users typing", usersTyping);
      console.log("existing user", existingTypingUser);
      if (existingTypingUser) {
        setUsersTyping((prev) => prev.filter((usr) => usr != data.username));
      }
    });
  }, [usersTyping]);
  const users = useSelector((state) => state.singleServer?.users);
  const channel = useSelector(
    (state) => state.singleServer?.channels[channelId]
  );

  const server = useSelector((state) => state.singleServer);
  const messages = useSelector((state) => {
    if (state.singleServer.selectedChannelId) {
      if (state.singleServer.channels[state.singleServer.selectedChannelId])
        return state.singleServer?.channels[
          state.singleServer.selectedChannelId
        ].messages;
    }
    return [];
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  if (!socket) return false;

  return (
    <div className='channel-message-list__container'>
      <div
        id='message-container'
        className='message__container'
        ref={messageContainerRef}
      >
        <h3 className='channel-message-list__container-title'>
          Welcome to #{channel ? channel.name : ""}!
        </h3>
        {users &&
          messages.map((msg, i) => {
            const user = users.find((usr) => usr.id == msg.user_id);
            return (
              <ChannelMessage
                key={i}
                message={msg}
                user={user}
                socket={socket}
              />
            );
          })}
      </div>
      {usersTyping.length > 0 && (
        <div className='users-typing'>
          {usersTyping.length > 3
            ? "Several people are typing..."
            : usersTyping.join(", ") + " is typing..."}
        </div>
      )}
    </div>
  );
}
