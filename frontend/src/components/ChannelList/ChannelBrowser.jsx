import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import ChannelMenuDrop from "./ChannelMenuDrop";
import { thunkGetAllServers } from "../../store/server";
import { updateSelectedChannelId } from "../../store/singleServer";
import { MainLoader } from "../Loading/MainLoader";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from '../CreateChannelModal';
import UserProfile from '../UserProfile'

export default function ChannelBrowser() {
  const serverStore = useSelector((state) => state.servers.orderedServers);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);

  const selectedChannel = useSelector(
    (state) => state.singleServer.selectedChannelId
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  if (!server) {
    return null;
  }

  const handleEdit = () => {
    alert('edit here!')
  }
  const handleDelete = () => {
    alert('delete here!')
  }

  return (
    <div className='dm-list-container'>
      <div className='channel-list-container'>
        <div className='channel-list-textchannels'>
          <p>TEXT CHANNELS</p>{" "}
          {server.owner_id == user.id ? (
            <OpenModalButton className='channel-list-add' modalComponent={<CreateChannelModal serverId={serverId} />} buttonText={<i className='fa-solid fa-plus'></i>}/>
          ): null}
        </div>
        {server.channels.orderedChannelsList.map((channel) => (
          <div className="channel-row">
            <span
              className={`${selectedChannel === channel.id && "highlight"}`}
              onClick={() => {
                dispatch(updateSelectedChannelId(channel.id));
                history.push(`/${serverId}/${channel.id}`);
              }}
            >
              {channel.type == "text" ? (
                <i className={`fa - solid fa-hashtag fa-md`}></i>
              ) : (
                ""
              )}
              {channel.name}
              {selectedChannel === channel.id ? (
                <div>
                  <i class="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                  <i class="fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
              ) : null}
            </span>
          </div>
        ))}
      </div>
      <UserProfile />
    </div>
  );
}
