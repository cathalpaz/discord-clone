import dayjs from "dayjs";
import { useSelector } from "react-redux";

export function DirectMessage({ messageId, usrId }) {
  const message = useSelector(
    (state) => state.directMessages.users[usrId][messageId]
  );

  if (!message) return false;
  
  return (
    <div className='channel-message__container'>
      <div className='channel-message__avatar-container'>
        <img src={message.user_from?.avatar || ""} alt='' />
      </div>
      <div className='channel-message__info'>
        <header className='channel-message__info__header'>
          <span>{message.user_from.username}</span>
          <span className='channel-message__info__header__date'>
            {dayjs(message.created_at).format("DD/MM/YYYY hh:mm A")}
          </span>
          {message.updated && (
            <span className='channel-message__info__header__edited'>
              (edited)
            </span>
          )}
        </header>
        <p className='channel-message__info__content'>{message.content}</p>
      </div>
    </div>
  );
}
