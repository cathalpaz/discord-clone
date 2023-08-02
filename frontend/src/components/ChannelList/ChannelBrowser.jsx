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
import CreateChannelModal from "../CreateChannelModal";
import UserProfile from "../UserProfile";
import DeleteModal from "../DeleteModal";
import { useModal } from "../../context/Modal";
import { thunkEditChannel } from "../../store/singleServer";

export default function ChannelBrowser() {
  const history = useHistory();
  const serverStore = useSelector((state) => state.servers.orderedServers);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.singleServer?.channels);
  const { setModalContent } = useModal()

  const selectedChannel = useSelector(
    (state) => state.singleServer.selectedChannelId
    );

  const thisChannel = channels[selectedChannel]
    useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  console.log("channels", channels);
  console.log(selectedChannel);

  if (!server) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(thisChannel.name)
  const [errors, setErrors] = useState({})

  const handleEdit = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSaveClick = (e) => {
    setIsEditing(false);
    setName(thisChannel.name)
    setErrors({})
  };

  const handleDelete = () => {
    setModalContent(<DeleteModal type='channel' />)
  }

  useEffect(() => {
    checkErrors();
  }, [name])

  const checkErrors = () => {
    const errors = {};
    if (name.length < 2)
      errors.name = "Name too short!";
    setErrors(errors);
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      handleSaveClick();
    }
  };
  const handleSubmit = async(e) => {
    console.log('1231231231231', name)
    const editedChannel = {
      id: thisChannel.id,
      name,
      type: 'text'
    }
    console.log('yooo', editedChannel)
    const data = await thunkEditChannel(editedChannel)
    if (data.errors) {
      setErrors(data.errors)
    } else {
      setIsEditing(false)
    }
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
          <div className="channel-row">
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

              {selectedChannel === cId && isEditing ? (
                  <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={handleSaveClick}
                  onKeyDown={handleKeyPress}
                />
                ) : (
                  <>
                    {channels[cId].name}
                    {selectedChannel === cId? (
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
