import { useSelector, useDispatch } from "react-redux";

import "../../styles/components/ChannelMessageList.css";
import { ChannelMessage } from "./ChannelMessage";
export function ChannelMessageList() {
  const users = useSelector((state) => state.singleServer?.users);
  const messages = useSelector((state) => {
    if (state.singleServer.selectedChannelId) {
      return state.singleServer.channels[state.singleServer.selectedChannelId]
        .messages;
    }
    return [];
  });
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
