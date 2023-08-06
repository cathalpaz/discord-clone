import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ServerToolTip } from "./ServerToolTip";
import { useRef, useState } from "react";

export function Server({ serverId }) {
  const imgRef = useRef();
  const server = useSelector((state) => state.servers[serverId]);
  const [isHover, setIsHover] = useState(false);
  const userStore = useSelector((state) => state.session.user);
  if (!server) return false;
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/${server.id}/${server.channels[0].id}`);
  };
  return (
    <>
      {server.owner.id == userStore.id ||
      server.users.map((user) => user.id == userStore.id) ? (
        <div
          className="server__container"
          onClick={handleClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="server__img-container" ref={imgRef}>
            <img
              style={{ width: "3rem", height: "3rem" }}
              className="serverlist-icon .tooltip-container"
              src={server.avatar}
              alt=""
            />
            {isHover && (
              <ServerToolTip serverName={server.name} parentRef={imgRef} />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
