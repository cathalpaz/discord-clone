import React, { useEffect, useState } from 'react'
import "../../styles/components/SendMessage.css";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function SendMessage() {
    const [message, setMessage] = useState("")
    const { serverId, channelId } = useParams()
    const singleServer = useSelector((state) => state.singleServer)

    return (
        <div className='send-message-container'>
            <input className="send-message-input" type="textbox" placeholder={`Message #${singleServer.channels[channelId]?.name != undefined ? singleServer.channels[channelId].name : ""}`} value={message} onChange={(e) => setMessage(e.target.value)}>

            </input>
        </div>
    )
}
