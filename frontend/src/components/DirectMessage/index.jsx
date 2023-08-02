import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkGetAllDirectMessages } from '../../store/directMessages';
import "../../styles/components/DirectMessage.css";

export default function DirectMessage({searchString}) {
  const directMessageStore = useSelector((state) => state.directMessages)
  const directMessageId = useSelector((state) => state.directMessages.orderedDirectMessages)
  const sessionUser = useSelector((state) => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const ownerMessage = [], friendMessage = []
  useEffect(() => {
    dispatch(thunkGetAllDirectMessages());
  }, [dispatch]);

  console.log('searchString IN DM', searchString)
  directMessageId.map((id) => {
    if (directMessageStore[id].user_from_id == sessionUser.id) {
        ownerMessage.push(directMessageStore[id])
    } else {
        friendMessage.push(directMessageStore[id])
    }
  })

  console.log("ownerMessage", ownerMessage)
  console.log('friendMessage', friendMessage)

  const sendToMain = () => {
    history.push("/@")
  }

  return (
      <>
        <div>
            <div className='direct-message-options-container'>
                <div onClick={sendToMain} className='direct-message-icon-friend'>
                    <i className="fa-solid fa-users"></i>
                    <span>Friends</span>
                </div>

            </div>
            <p style={{fontSize:"12px", fontWeight:"600", color:"var(--secondary-accent)", marginLeft:".5rem", marginBottom:".5rem"}}>DIRECT MESSAGES</p>
            {ownerMessage.filter(message => message.user_to.username.toLowerCase().includes(searchString.toLowerCase())).map(message => (
                <>
                    <div  className='direct-message-container'>
                        <img className="direct-message __image" src={message.user_to.avatar}></img>
                        <p>{message.user_to.username}</p>
                    </div>
                </>
            ))}
        </div>
    </>
  )
}
