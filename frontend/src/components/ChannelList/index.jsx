import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllServers } from "../../store/server";
import ServerList from "../ServerList";
import '../../styles/components/ServerList.css';
import '../../styles/components/ChannelList.css';

function ChannelList() {
    const serversStore = useSelector((state) => state.servers)
    const { serverId, channelId } = useParams()
    const dispatch = useDispatch()
    const servers = Object.values(serversStore)
    console.log(servers)
    const server = servers[serverId - 1]
    console.log(server)
    useEffect(() => {
        dispatch(thunkGetAllServers())
    }, [dispatch]);

    return (
        <>
        	<div className="main-page-container">
				<div className="server-list-container">
					<ServerList />
				</div>
				<div className="dm-list-container">
                    <div className="dm-list-header">
                        <p>{server.name}</p>
                    </div>
                    <div className="channel-list-container">
                        <div className="channel-list-textchannels">
                            TEXT CHANNELS
                        </div>
                        {server.channels.map(channel => (
                            <>
                                <span>{channel.type == "text" ? <i class="fa-solid fa-hashtag fa-md"></i> : ""}{channel.name}</span>
                            </>
                        ))}
                    </div>
				</div>
				<div className="general-view-container">
					<div>asdasd</div>
				</div>
			</div>
        </>
    )
}

export default ChannelList
