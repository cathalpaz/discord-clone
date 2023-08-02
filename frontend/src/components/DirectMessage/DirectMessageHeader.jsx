import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import "../../styles/components/DirectMessageHeader.css";

export default function DirectMessageHeader() {
  const { directMessageId } = useParams()
  const directMessageStore = useSelector(state => state.directMessages?.[directMessageId])

  return (
    <div className='direct-message-header-container'>
        <img src={directMessageStore?.user_to.avatar}></img>
        <p>{directMessageStore?.user_to.username}</p>

    </div>
  )
}
