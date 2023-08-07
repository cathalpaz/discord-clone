import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetAllServers } from "../../store/server";
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../CreateServerModal";
import { Server } from "./Server";
import { ServerToolTip } from "./ServerToolTip";
import "../../styles/components/ServerList.css";

function ServerList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const serverIds = useSelector((state) => state.servers.orderedServers);
  const createServerRef = useRef();
  const discoverServersRef = useRef();
  const dmRef = useRef();
  const [createServerHover, setCreateServerHover] = useState(false);
  const [discoverServersHover, setDiscoverServersHover] = useState(false);
  const [dmHover, setDmHover] = useState(false);

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
    history.push("/discovery");
  };

  return (
    <>
      <div className="serverlist-container">
        <div
          onClick={sendToMain}
          className="serverlist-friend-button"
          style={{ position: "relative" }}
          ref={dmRef}
          onMouseEnter={() => setDmHover(true)}
          onMouseLeave={() => setDmHover(false)}
        >
          {dmHover && (
            <ServerToolTip serverName={"Direct Messages"} parentRef={dmRef} />
          )}
          <i className="fa-brands fa-discord fa-lg"></i>
        </div>
        <div>
          <p
            style={{
              borderBottom: "2px solid #35363C",
              width: "2rem",
              marginTop: ".6rem",
              marginBottom: ".6rem",
            }}
          ></p>
        </div>
        <div className="serverlist-main-list">
          {serverIds.map((id) => (
            <Server key={id} sId={id} onClick={openServer} />
          ))}
          <span
            className="serverlist-add-server .tooltip-container"
            ref={createServerRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setCreateServerHover(true)}
            onMouseLeave={() => setCreateServerHover(false)}
          >
            {createServerHover && (
              <ServerToolTip
                parentRef={createServerRef}
                serverName={"Create server"}
              />
            )}
            <div className="tooltip">Add a server</div>
            <OpenModalButton
              modalComponent={<CreateServerModal />}
              buttonText={"+"}
            />
          </span>
          <div>
            <p
              style={{
                borderBottom: "2px solid #35363C",
                width: "2rem",
              }}
            ></p>
          </div>
          <span
            style={{ position: "relative" }}
            className="serverlist-add-server"
            ref={discoverServersRef}
            onMouseEnter={() => setDiscoverServersHover(true)}
            onMouseLeave={() => setDiscoverServersHover(false)}
          >
            {discoverServersHover && (
              <ServerToolTip
                parentRef={discoverServersRef}
                serverName={"Discover servers"}
              />
            )}
            <i
              className="fa-solid fa-compass serverlist-add-server-icon"
              onClick={sendToDiscover}
            ></i>
          </span>
        </div>
      </div>
    </>
  );
}

export default ServerList;
