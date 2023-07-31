import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import ChannelMenuDrop from "./ChannelMenuDrop";
import { thunkGetAllServers } from "../../store/server";
import { updateSelectedChannelId } from "../../store/singleServer";

export default function ChannelBrowser() {
  const serverStore = useSelector((state) => state.servers.orderedServers);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.servers[serverId]);
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  const createChannel = () => {
    alert("Need to add create channel");
  };
  return (
    <div className='dm-list-container'>
      <div className='dm-list-header'>
        <ChannelMenuDrop />
        <p>{server?.name}</p>
      </div>
      <div className='channel-list-container'>
        <div className='channel-list-textchannels'>
          <p>TEXT CHANNELS</p>{" "}
          <i
            onClick={createChannel}
            className='fa-solid fa-plus channel-list-add'
          ></i>
        </div>
        {server.channels.map((channel) => (
          <>
            <span
              onClick={() => {
                dispatch(updateSelectedChannelId(channel.id));
                history.push(`/${serverId}/${channel.id}`);
              }}
            >
              {channel.type == "text" ? (
                <i class='fa-solid fa-hashtag fa-md'></i>
              ) : (
                ""
              )}
              {channel.name}
            </span>
          </>
        ))}
      </div>
    </div>
  );
}
