import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DirectMessage } from "./DirectMessage";
import { addDm } from "../../store/directMessages";
import "../../styles/components/ChannelMessageList.css";
import { MainLoader } from "../Loading/MainLoader";

export function DirectMessageList({ socket }) {
  const user = useSelector((state) => state.session.user);
  const { directMessageId } = useParams();
  const dispatch = useDispatch();
  const messageContainerRef = useRef(null);
  const [userTyping, setUserTyping] = useState("");
  const newMessagesIds = useSelector(
    (state) => state.directMessages.users[directMessageId]?.orderedMessages
  );
  useEffect(() => {
    console.log("THIS USEEFFECT IS RUNNING");
    const eventName = `user-dm-${
      +user.id < +directMessageId
        ? `${user.id}-${directMessageId}`
        : `${directMessageId}-${user.id}`
    }-typing`;
    console.log("THIS IS THE EVENT NAME", eventName);
    if (!socket) return;
    socket.on(`user-dm-${user.id}`, (dm) => {
      dispatch(addDm(dm));
    });
    socket.on(eventName, (data) => {
      console.log("THIS IS THE DATA SOCKET", data);
      if (data.typing === true) {
        setUserTyping(data.username);
      } else setUserTyping("");
    });
    return () => {
      socket.off(`user-id-${user.id}`);
      socket.off(eventName);
    };
  }, [directMessageId, socket]);

  if (!socket) return false;

  if (!newMessagesIds) return <MainLoader />;

  return (
    <>
      <div
        className='dm-messages'
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <style>
          {`
              .message-container::-webkit-scrollbar {
                display: none;
              }
            `}
        </style>
        <div
          className='message-container'
          style={{
            overflowY: "scroll",
            height: "",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {newMessagesIds.map((mId) => (
            <DirectMessage key={mId} messageId={mId} usrId={directMessageId} />
          ))}
        </div>
        {userTyping !== "" && userTyping !== user.username && (
          <span style={{ padding: "3px" }}>{userTyping} is typing</span>
        )}
      </div>
    </>
  );
}
