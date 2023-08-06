import dayjs from "dayjs";
import { useSelector } from "react-redux";
import UpdateMessageModal from "../UpdateMessageModal";
import OpenModalButton from "../OpenModalButton";

export function DirectMessage({ messageId, usrId, socket }) {
  const currentUser = useSelector((state) => state.session.user);
  const message = useSelector(
    (state) => state.directMessages.users[usrId][messageId]
  );

  if (!message) return false;

  const deleteDM = () => {
    console.log('hi')
  }



  return (
    <div className="channel-message__container">
      <div className="channel-message__avatar-container">
        <img src={message.user_from?.avatar || ""} alt="" />
      </div>
      <div className="channel-message__info">
        <header className="channel-message__info__header">
          <span>{message.user_from.username}</span>
          <span className="channel-message__info__header__date">
            {dayjs(message.created_at).format("DD/MM/YYYY hh:mm A")}
          </span>
          {message.updated && (
            <span className="channel-message__info__header__edited">
              (edited)
            </span>
          )}
          {/* {currentUser.id === message.user_from?.id ? (
            <div className="message-hidden">
              <OpenModalButton
                modalComponent={
                  <UpdateMessageModal
                    // socket={socket}
                    message={message}
                    type={"channel"}
                  />
                }
                buttonText={<i className="fa-solid fa-pencil"></i>}
                className={"update-conversation"}
              />
              <button className="delete-message-button" onClick={deleteDM}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ) : null} */}
        </header>
        <p className="channel-message__info__content">{message.content}</p>
      </div>
    </div>
  );
}
