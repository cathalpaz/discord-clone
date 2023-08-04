import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DirectMessage } from "./DirectMessage";
import { addDm } from "../../store/directMessages";
import "../../styles/components/ChannelMessageList.css";

export function DirectMessageList({ socket }) {
  if (!socket) return false;
  const user = useSelector((state) => state.session.user);
  const { directMessageId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(`user-dm-${user.id}`, (dm) => {
      dispatch(addDm(dm));
    });
    return () => {
      socket.off(`user-id-${user.id}`);
    };
  }, []);

  const messages = useSelector((state) => {
    if (state.directMessages[directMessageId]) {
      return state.directMessages?.[directMessageId];
    }
  });

  const newMessagesIds = useSelector(
    (state) => state.directMessages.users[directMessageId].orderedMessages
  );

  return (
    <>
      {/* {newMessagesIds && (
        <div className='channel-message-list__container'>
          {user && <DirectMessage messageId={newMessagesIds} />}
        </div>
      )} */}
      {newMessagesIds.map((mId) => (
        <DirectMessage messageId={mId} usrId={directMessageId} />
      ))}
    </>
  );
}
