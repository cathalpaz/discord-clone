import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { thunkGetAllServers } from "../../store/server";
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../CreateServerModal";
import SearchServers from '../SearchServers'
import "../../styles/components/ServerList.css";

function ServerList() {
  const serversStore = useSelector((state) => state.servers);
  const dispatch = useDispatch();
  const history = useHistory();
  const serverIds = useSelector((state) => state.servers.orderedServers);

  useEffect(() => {
    dispatch(thunkGetAllServers());
  }, [dispatch]);

  const openServer = (server) => {
    history.push(`/${server.id}/${server.channels[0].id}`);
  };

  const sendToMain = () => {
    history.push("/@");
  };

  const sendToDiscover = () => {
    history.push('/discovery')
  }


  return (
    <>
      <div className='serverlist-container'>
        <div onClick={sendToMain} className='serverlist-friend-button'>
          <i className='fa-brands fa-discord fa-lg'></i>
        </div>
        <div>
          <p
            style={{
              borderBottom: "2px solid #35363C",
              width: "2rem",
              marginTop: ".5rem",
              marginBottom: ".5rem",
            }}
          ></p>
        </div>
        <div className='serverlist-main-list'>
          {serverIds.map((id) => (
            <>
              <img
                style={{ width: "3rem", height: "3rem" }}
                onClick={() => openServer(serversStore[id])}
                className='serverlist-icon .tooltip-container'
                src={serversStore[id].avatar}
              ></img>
              <div className="tooltip">{serversStore[id].name}</div>
            </>
          ))}
          <span className='serverlist-add-server .tooltip-container'>
            <div className="tooltip">Add a server</div>
            <OpenModalButton
              modalComponent={<CreateServerModal />}
              buttonText={"+"}
            />
          </span>
          <span className='serverlist-add-server'>

              <i className="fa-solid fa-compass serverlist-add-server-icon" onClick={sendToDiscover}></i>

          </span>
        </div>
      </div>
    </>
  );
}

export default ServerList;
