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
import CreateChannelModal from "../CreateChannelModal";
import UserProfile from "../UserProfile";

export default function ChannelBrowser() {
  const serverStore = useSelector((state) => state.servers.orderedServers);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.singleServer?.channels);

  const selectedChannel = useSelector(
    (state) => state.singleServer.selectedChannelId
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  console.log("channels", channels);
  console.log(selectedChannel);

  if (!server) {
    return null;
  }

  return (
    <div className='dm-list-container'>
      <div className='channel-list-container'>
        <div className='channel-list-textchannels'>
          <p>TEXT CHANNELS</p>{" "}
          {server.owner_id == user.id ? (
            <OpenModalButton
              className='channel-list-add'
              modalComponent={<CreateChannelModal serverId={serverId} />}
              buttonText={<i className='fa-solid fa-plus'></i>}
            />
          ) : null}
        </div>
        {channels.orderedChannelsList.map((cId) => (
          <>
            <span
              className={`${selectedChannel === cId && "highlight"}`}
              onClick={() => {
                dispatch(updateSelectedChannelId(cId));
                history.push(`/${serverId}/${cId}`);
              }}
            >
              {channels[cId]?.type == "text" ? (
                <i className={`fa - solid fa-hashtag fa-md`}></i>
              ) : (
                ""
              )}
              {channels[cId].name}
            </span>
          </>
        ))}
      </div>
      <UserProfile />
    </div>
  );
}
