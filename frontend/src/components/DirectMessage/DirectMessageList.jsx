import { useSelector, useDispatch } from "react-redux";
import "../../styles/components/ChannelMessageList.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DirectMessage } from "./DirectMessage";

export function DirectMessageList() {
  const users = useSelector((state) => state.session.user);
  const { directMessageId } = useParams()
  
  const messages = useSelector((state) => {
    if (state.directMessages[directMessageId]) {
      return state.directMessages?.[directMessageId]
    }
  });

  return (
    <>
      { messages &&
        <div className='channel-message-list__container'>
          {users &&
              <DirectMessage message={messages} />
            }
        </div>
      }
    </>

  );
}
