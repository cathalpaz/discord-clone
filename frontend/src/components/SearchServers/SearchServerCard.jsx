import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllServers } from "../../store/server";
import { useHistory } from "react-router-dom";

function SearchServerCard({ server }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const myServerIds = useSelector((state) => state.servers.orderedServers);

  if (!server) {
    return null;
  }

  const handleJoin = async () => {
    const res = await fetch(`/api/servers/${server.id}/join`);
    const data = await res.json();
    dispatch(thunkGetAllServers(data));

    history.push(`/${server.id}/${server.channels[0].id}`);
    window.location.reload();
  };

  return (
    <div className="server-card_container">
      <div className="card-image-banner">
        <img src={server.avatar} />
      </div>
      <div className="card-info">
        <div className="card-name">{server.name}</div>
        <div className="card-footer">
          <div>{server.users.length} members</div>
          {myServerIds.includes(server.id) ? (
            <span className="joined-btn">Joined</span>
          ) : (
            <span className="join-btn" onClick={handleJoin}>
              Join
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchServerCard;
