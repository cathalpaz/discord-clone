import dayjs from "dayjs";
import OpenModalButton from "../OpenModalButton";
import UpdateMessageModal from "../UpdateMessageModal";
import { useSelector } from "react-redux";

export function ChannelMessage({ message, user, socket }) {
  const currentUser = useSelector((state) => state.session.user);
  if (!user) return false;

  return (
    <div className='channel-message__container'>
      <div className='channel-message__avatar-container'>
        <img src={user?.avatar || ""} alt='' />
      </div>
      <div className='channel-message__info'>
        <header className='channel-message__info__header-container'>
          <div className='channel-message__info__header'>
            <span>{user.username}</span>
            <span className='channel-message__info__header__date'>
              {dayjs(message.created_at).format("MM/DD/YYYY hh:mm A")}
            </span>
            {message.updated && (
              <span className='channel-message__info__header__edited'>
                (edited)
              </span>
            )}
          </div>
          {currentUser.id === user.id ? (
            <div className='message-hidden'>
              <OpenModalButton
                modalComponent={
                  <UpdateMessageModal
                    socket={socket}
                    message={message}
                    type={"channel"}
                  />
                }
                buttonText={<i className='fa-solid fa-pencil'></i>}
                className={"update-conversation"}
              />
              <button
                className='delete-message-button'
                onClick={() => deleteChat(message.id)}
              >
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          ) : null}
        </header>
        <p className='channel-message__info__content'>{message.content}</p>
      </div>
    </div>
  );
}
