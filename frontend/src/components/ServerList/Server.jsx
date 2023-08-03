import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Server({ serverId }) {
  const server = useSelector((state) => state.servers[serverId]);
  const userStore = useSelector((state) => state.session.user)
  if (!server) return false;
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/${server.id}/${server.channels[0].id}`);
  };
  return (
    <>
      {server.owner.id == userStore.id || server.users.map(user => user.id == userStore.id ) ?
      <div className='server__container' onClick={handleClick}>
        <div className='server__img-container'>
          <img
            style={{ width: "3rem", height: "3rem" }}
            className='serverlist-icon .tooltip-container'
            src={server.avatar}
            alt=''
          />
          <div className='server__img-tooltip'>{server.name}</div>
        </div>
      </div>
        : "" }
    </>
  );
}
