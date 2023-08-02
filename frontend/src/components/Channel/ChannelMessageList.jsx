import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "../../styles/components/ChannelMessageList.css";
import { ChannelMessage } from "./ChannelMessage";
import { updateChannelMessages } from "../../store/singleServer";
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
      console.log("THIS IS THE MESSAGE", data);
      dispatch(updateChannelMessages(data));
    });
    return () => {
      socket.off(`server-channel-messages-${serverId}`);
    };
  }, [serverId]);
  console.log("these are the messages", messages);
  return (
    <div className='channel-message-list__container'>
      {users &&
        messages.map((msg, i) => {
          const user = users.find((usr) => usr.id == msg.user_id);
          return <ChannelMessage key={i} message={msg} user={user} />;
        })}
    </div>
  );
}
