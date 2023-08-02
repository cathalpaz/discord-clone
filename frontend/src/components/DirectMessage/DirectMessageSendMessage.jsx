import React, { useState }  from 'react'
import { useSelector } from 'react-redux'
import "../../styles/components/SendMessage.css";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function DirectMessageSendMessage() {
  const { directMessageId } = useParams();
  const directMessageStore = useSelector(state => state.directMessages?.[directMessageId]);
  const [message, setMessage] = useState("");
    console.log(directMessageStore)

  return (
    <div className='send-message-container'>

        <input className="send-message-input" type="textbox" placeholder={ `Message @${directMessageStore?.user_to.username}`} value={message} onChange={(e) => setMessage(e.target.value)}></input>

    </div>
  )
}
