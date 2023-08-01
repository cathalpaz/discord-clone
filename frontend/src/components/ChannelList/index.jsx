import React from "react";
import {  useSelector } from "react-redux";
import "../../styles/components/ChannelList.css";
import ChannelDirectMessage from "../ChannelDirectMessage";

function ChannelList() {
  const channel = useSelector((state) => {
    if (state.singleServer.channels) {
      if (state.singleServer.selectedChannelId) {
        return state.singleServer.channels[
          state.singleServer.selectedChannelId
        ];
      }
      return null;
    }
  });

  return (
    <>
      <div className='general-view-header'>
        <p>
          <i class='fa-solid fa-hashtag fa-md'></i>
          {channel && channel.name}
        </p>
      </div>
      <ChannelDirectMessage />
    </>
  );
}

export default ChannelList;
