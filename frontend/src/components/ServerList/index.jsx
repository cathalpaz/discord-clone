import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { thunkGetAllServers } from "../../store/server";
import '../../styles/components/ServerList.css';

function ServerList() {
    const serversStore = useSelector((state) => state.servers)
    const dispatch = useDispatch()
    const history = useHistory()
    const servers = Object.values(serversStore)

    useEffect(() => {
        dispatch(thunkGetAllServers())
    }, [dispatch]);

    const openServer = (server) => {
        history.push(`/${server.id}/${server.channels[0].id}`)
    }

	return (
		<>
			<div className="serverlist-container">
                <div className="serverlist-friend-button">
                    <i className='fa-brands fa-discord fa-lg'></i>
                </div>
                <div>
                    <p style={{borderBottom:"2px solid #35363C", width:"2rem", marginTop:".5rem", marginBottom:".5rem"}}></p>
                </div>
                <div className="serverlist-main-list">
                    {servers.map(server => (
                        <>
                            <img style={{width:"3rem", height:"3rem"}} onClick={() => openServer(server)} className="serverlist-icon" src={server.avatar}></img>
                        </>
                    ))}
                    <span className="serverlist-add-server">+</span>
                </div>

			</div>
		</>
	);
}

export default ServerList;
