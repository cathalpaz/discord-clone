import { useSelector, useDispatch } from "react-redux";

import "../../styles/components/ChannelMessageList.css";
import { DirectMessage } from "./DirectMessage";
export function DirectMessageList() {
  const users = useSelector((state) => state.singleServer?.users);
  const messages = useSelector((state) => {
    if (state.singleServer.selectedChannelId) {
      if (state.singleServer.channels[state.singleServer.selectedChannelId])
        return state.singleServer?.channels[
          state.singleServer.selectedChannelId
        ].messages;
    }
    return [];
  });
  console.log("these are the messages", messages);
  return (
    <div className='channel-message-list__container'>
      {users &&
        messages.map((msg, i) => {
          const user = users.find((usr) => usr.id == msg.user_id);
          return <DirectMessage key={i} message={msg} user={user} />;
        })}
    </div>
  );
}
