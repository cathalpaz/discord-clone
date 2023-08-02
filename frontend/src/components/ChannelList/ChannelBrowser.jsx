import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import ChannelMenuDrop from "./ChannelMenuDrop";
import { thunkGetAllServers } from "../../store/server";
import { updateSelectedChannelId } from "../../store/singleServer";
import { MainLoader } from "../Loading/MainLoader";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from '../CreateChannelModal';
import UserProfile from '../UserProfile'

export default function ChannelBrowser() {
  const history = useHistory();
  const serverStore = useSelector((state) => state.servers.orderedServers);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  const thisChannel = server.channels[channelId]

  const selectedChannel = useSelector(
    (state) => state.singleServer.selectedChannelId
    );


    useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  if (!server) {
    return null;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(thisChannel.name)
  const [errors, setErrors] = useState({})

  const handleEdit = (e) => {
    e.stopPropagation()
    console.log('hi')
    setIsEditing(true)
  }
  console.log(isEditing)
  const handleSaveClick = () => {
    console.log('hi')
    setIsEditing(false);
    setName(thisChannel.name)
    setErrors({})
  };
  const handleDelete = () => {
    alert('delete here!')
  }

  useEffect(() => {
    checkErrors();
  }, [name])

  const checkErrors = () => {
    const errors = {};

    if (name.length < 2)
      errors.name = "Name must be at least 2 characters";

    setErrors(errors);
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
              {isEditing ? (
                  <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={handleSaveClick}
                  autoFocus
                />
                ) : (
                  <>
                    {channel.name}
                    {selectedChannel === channel.id ? (
                      <div>
                        <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                        <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                      </div>
                    ) : null}
                  </>
                )}
            </span>
          </div>
        ))}
      </div>
      <UserProfile />
    </div>
  );
}
