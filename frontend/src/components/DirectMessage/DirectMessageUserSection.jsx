import React, { useState } from 'react'
import "../../styles/components/DirectMessageUserSection.css"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function DirectMessageUserSection() {
    const directMessageStore = useSelector(state => state.directMessages.users)
    const {directMessageId} = useParams()
    const [note, setNote] = useState("")
    console.log('store', directMessageStore[directMessageId])
    const date = directMessageStore[directMessageId]?.created_at.split(" ")
    const newDate = `${date[2]} ${date[1]} ${date[3]}`

    console.log('note', note)
  return (
    <div className='direct-message-user-container'>
        <div style={{backgroundColor:directMessageStore[directMessageId]?.banner, height:"10rem"}} className='direct-message-user-banner-container'>
            <img src={directMessageStore[directMessageId]?.avatar}></img>
        </div>
        <div className='direct-message-user-info-container'>
            <div className='direct-message-user-info'>
                <p>{directMessageStore[directMessageId]?.username}</p>
                <p className='direct-message-user-info-divider'></p>
                <p>SLACORD MEMBER SINCE</p>
                <p>{newDate}</p>
                <p className='direct-message-user-info-divider'></p>
                <p>NOTE</p>
                <input placeholder='Click to add a note' value={note} onClick={() =>alert('Feature coming soon!')}></input>
            </div>
        </div>
    </div>
  )
}
