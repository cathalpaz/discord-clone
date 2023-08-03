import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/components/DirectMessageHeader.css";

export default function DirectMessageHeader() {
  const { directMessageId } = useParams();
  const otherUser = useSelector(
    (state) => state.directMessages.users[directMessageId]
  );
  if (!otherUser) return false;

  return (
    <div className='direct-message-header-container'>
      <img src={otherUser.avatar}></img>
      <p>{otherUser.username}</p>
    </div>
  );
}
