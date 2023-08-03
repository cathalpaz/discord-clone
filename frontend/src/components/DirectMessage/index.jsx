import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkGetAllDirectMessages } from "../../store/directMessages";
import "../../styles/components/DirectMessage.css";

export default function DirectMessage({ searchString }) {
  const directMessageStore = useSelector((state) => state.directMessages);
  const directMessageId = useSelector(
    (state) => state.directMessages.orderedDirectMessages
  );
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return false;
  const history = useHistory();
  const dispatch = useDispatch();
  const ownerMessage = [],
    friendMessage = [];

  const dmUsers = useSelector((state) => state.directMessages.users);
  console.log("THE DM USERS", dmUsers);

  useEffect(() => {
    dispatch(thunkGetAllDirectMessages(sessionUser.id));
  }, [dispatch]);

  directMessageId.map((id) => {
    if (directMessageStore[id].user_from_id == sessionUser.id) {
      ownerMessage.push(directMessageStore[id]);
    } else {
      friendMessage.push(directMessageStore[id]);
    }
  });

  const sendToMain = () => {
    history.push("/@");
  };

  const sendToDM = (usrId) => {
    history.push(`/@/${usrId}`);
  };

  const activeCheck = () => {};

  return (
    <>
      <div>
        <div className='direct-message-options-container'>
          <div onClick={sendToMain} className='direct-message-icon-friend'>
            <i className='fa-solid fa-users'></i>
            <span>Friends</span>
          </div>
        </div>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--secondary-accent)",
            marginLeft: ".5rem",
            marginBottom: ".5rem",
          }}
        >
          DIRECT MESSAGES
        </p>
        {/* {ownerMessage
          .filter((message) =>
            message.user_to.username
              .toLowerCase()
              .includes(searchString.toLowerCase())
          )
          .map((message) => (
            <>
              <div
                onClick={() => sendToDM(message)}
                className='direct-message-container'
              >
                <img
                  className='direct-message __image'
                  src={message.user_to.avatar}
                ></img>
                <p>{message.user_to.username}</p>
              </div>
            </>
          ))} */}
        {dmUsers.orderedUsers.map((usrId) => (
          <>
            <div
              onClick={() => sendToDM(usrId)}
              className='direct-message-container'
            >
              <img
                className='direct-message __image'
                src={
                  dmUsers[usrId].avatar ||
                  "https://discord-clone-a-a.s3.us-west-1.amazonaws.com/default-user.jpg"
                }
              ></img>
              <p>{dmUsers[usrId].username}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
