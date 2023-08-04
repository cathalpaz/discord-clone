import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/components/ChannelMessageList.css";
import { ChannelMessage } from "./ChannelMessage";
import {
  deleteSingleChannelMessage,
  updateChannelMessages,
} from "../../store/singleServer";
export function ChannelMessageList({ socket }) {
  if (!socket) return false;
  const { channelId, serverId } = useParams();
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
    socket.on(`server-channel-messages-${serverId}`, (data) => {
      dispatch(updateChannelMessages(data));
    });
    socket.on(`server-channel-messages-delete-${serverId}`, (data) => {
      const { messageId, channelId } = data;
      dispatch(deleteSingleChannelMessage(channelId, messageId));
    });
    return () => {
      socket.off(`server-channel-messages-${serverId}`);
      socket.off(`server-channel-messages-delete-${serverId}`);
    };
  }, [serverId]);

  return (
    <div className='channel-message-list__container'>
      <div className='message__container'>
        <h3 className='channel-message-list__container-title'>
          Welcome to #{channel ? channel.name : ""}!
        </h3>
        {users &&
          messages.map((msg, i) => {
            const user = users.find((usr) => usr.id == msg.user_id);
            return (
              <>
                <ChannelMessage
                  key={i}
                  message={msg}
                  user={user}
                  socket={socket}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}
