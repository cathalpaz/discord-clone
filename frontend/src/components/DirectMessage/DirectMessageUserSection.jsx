import React, { useState } from "react";
import "../../styles/components/DirectMessageUserSection.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import dayjs from "dayjs";

export default function DirectMessageUserSection() {
  const dmUsers = useSelector((state) => state.directMessages.users);
  const { directMessageId } = useParams();
  const [note, setNote] = useState("");
  if (!dmUsers[directMessageId]) return false;
  const newDate = dayjs(dmUsers[directMessageId].created_at).format(
    "MM/DD/YYYY"
  );

  // console.log("note", note);
  return (
    <div className='direct-message-user-container'>
      <div
        style={{
          backgroundColor: dmUsers[directMessageId]?.banner,
          height: "10rem",
        }}
        className='direct-message-user-banner-container'
      >
        <img src={dmUsers[directMessageId]?.avatar}></img>
      </div>
      <div className='direct-message-user-info-container'>
        <div className='direct-message-user-info'>
          <p>{dmUsers[directMessageId]?.username}</p>
          <p className='direct-message-user-info-divider'></p>
          <p>SLACORD MEMBER SINCE</p>
          <p>{newDate}</p>
          <p className='direct-message-user-info-divider'></p>
          <p>NOTE</p>
          <input
            placeholder='Click to add a note'
            value={note}
            onClick={() => alert("Feature coming soon!")}
          ></input>
        </div>
      </div>
    </div>
  );
}
