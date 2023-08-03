import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Server({ serverId }) {
  const server = useSelector((state) => state.servers[serverId]);
  if (!server) return false;
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/${server.id}/${server.channels[0].id}`);
  };
  return (
    <div className='server__container' onClick={handleClick}>
      <div className='server__img-container'>
        <img
          className='serverlist-icon .tooltip-container'
          src={server.avatar}
          alt=''
        />
        <div className='server__img-tooltip'>{server.name}</div>
      </div>
    </div>
  );
}
