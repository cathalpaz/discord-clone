import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DirectMessage } from "./DirectMessage";
import { addDm } from "../../store/directMessages";
import "../../styles/components/ChannelMessageList.css";
import { MainLoader } from "../Loading/MainLoader";

export function DirectMessageList({ socket }) {
  if (!socket) return false;
  const user = useSelector((state) => state.session.user);
  const { directMessageId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(`user-dm-${user.id}`, (dm) => {
      console.log("DM IS COMING IN");
      dispatch(addDm(dm));
    });
    return () => {
      socket.off(`user-id-${user.id}`);
    };
  }, [directMessageId]);

  // useEffect(() => {

  // }, [directMessageId])

  const newMessagesIds = useSelector(
    (state) => state.directMessages.users[directMessageId]?.orderedMessages
  );
  if (!newMessagesIds) return <MainLoader />;

  return (
    <>
      {newMessagesIds.map((mId) => (
        <DirectMessage key={mId} messageId={mId} usrId={directMessageId} />
      ))}
    </>
  );
}
