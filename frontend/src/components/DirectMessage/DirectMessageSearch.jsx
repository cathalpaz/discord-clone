import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/DirectMessageSearch.css";
export default function DirectMessageSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    const searchDirectMessages = (event) => {
        setSearchQuery(event.target.value);
      };

    return (
    <div className='direct-message-search-container'>
        <input
            type="text"
            placeholder="Find or start a conversation"
            value={searchQuery}
            onChange={searchDirectMessages}
            className="direct-message-search-input-bar"
          />
    </div>
  )
}
