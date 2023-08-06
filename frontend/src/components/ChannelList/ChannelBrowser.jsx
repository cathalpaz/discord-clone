import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useRef } from "react";
import { thunkGetAllServers } from "../../store/server";
import { updateSelectedChannelId } from "../../store/singleServer";
import CreateChannelModal from "../CreateChannelModal";
import DeleteModal from "../DeleteModal";
import { useModal } from "../../context/Modal";
import { thunkEditChannel } from "../../store/singleServer";
import { CreateChannelToolTip } from "./CreateChannelToolTip";
import OpenModalSpan from "../OpenModalSpan";
import "../../styles/components/ChannelList.css";

export default function ChannelBrowser({ socket }) {
  if (!socket) return false;
  const server = useSelector((state) => state.singleServer);
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.singleServer?.channels);
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const input = useRef(null);
  const [channelNotifications, setChannelNotifications] = useState({});
  const createChannelRef = useRef();
  const [createChannelHover, setCreateChannelHover] = useState(false);
  const editChannelRef = useRef();
  const [editChannelHover, setEditChannelHover] = useState(false);
  const deleteChannelRef = useRef();
  const [deleteChannelHover, setDeleteChannelHover] = useState(false);

  const selectedChannel = useSelector(
    (state) => state.singleServer.selectedChannelId
  );

  const thisChannel = channels[selectedChannel];
  useEffect(() => {
    dispatch(thunkGetAllServers);
  }, [dispatch]);

  if (!server) {
    return false;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(thisChannel ? thisChannel.name : "");
  const [errors, setErrors] = useState({});

  const handleEdit = (e, cId) => {
    e.stopPropagation();
    setName(channels[cId].name);
    dispatch(updateSelectedChannelId(cId));
    setIsEditing(true);
  };

  useEffect(() => {
    function handleClickOff(event) {
      if (input.current && !input.current.contains(event.target)) {
        setIsEditing(false);
        setName(thisChannel.name);
        setErrors({});
      }
    }
    document.addEventListener("mousedown", handleClickOff);
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, [input]);

  useEffect(() => {
    socket.on(`server-channel-messages-notifications-${serverId}`, (data) => {
      if (data.channel_id != channelId && data.user_id != user.id) {
        setChannelNotifications((prevChannelNotifications) => {
          const updatedChannelNotifications = { ...prevChannelNotifications };

          if (updatedChannelNotifications[+data.channel_id]) {
            updatedChannelNotifications[data.channel_id].count += 1;
          } else {
            updatedChannelNotifications[data.channel_id] = { count: 1 };
          }

          return updatedChannelNotifications;
        });
      }
    });
  }, [serverId]);

  const handleDelete = () => {
    setModalContent(<DeleteModal type="channel" cId={selectedChannel} />);
  };

  useEffect(() => {
    checkErrors();
  }, [name]);

  useEffect(() => {
    if (channelId != selectedChannel) {
      dispatch(updateSelectedChannelId(channelId));
    }
  }, []);

  const checkErrors = () => {
    const errors = {};
    if (!name.length) errors.name = "Name too short!";
    setErrors(errors);
  };

  const handleKeyClick = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "Escape") {
      handleClickOff();
    }
  };
  const handleSubmit = async (e) => {
    checkErrors();
    if (Object.keys(errors).length) return;
    const editedChannel = {
      id: thisChannel.id,
      name,
      type: "text",
    };
    const data = await dispatch(thunkEditChannel(editedChannel));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="dm-list-container">
      <div className="channel-list-container">
        <div className="channel-list-textchannels">
          <p>TEXT CHANNELS</p>{" "}
          <span
            className="channel-list-create-channel-tooltip"
            ref={createChannelRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setCreateChannelHover(true)}
            onMouseLeave={() => setCreateChannelHover(false)}
          >
            {server.owner_id == user.id ? (
              <OpenModalSpan
                modalComponent={<CreateChannelModal serverId={serverId} />}
                buttonText={
                  <i className="fa-solid fa-plus fa-lg create-channel-button"></i>
                }
              />
            ) : null}
            {createChannelHover && (
              <CreateChannelToolTip
                parentRef={createChannelRef}
                serverName={"Create server"}
              />
            )}
          </span>
        </div>

        {channels.orderedChannelsList.map((cId) => (
          <div key={cId} className="channel-row">
            <span
              className={`${selectedChannel == cId && "highlight"} ${
                channelNotifications[cId] && "notification"
              }`}
              onClick={() => {
                setChannelNotifications((prev) => {
                  const newChannelNotifications = { ...prev };
                  delete newChannelNotifications[cId];
                  return newChannelNotifications;
                });
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
                  className="edit-channel_input"
                  ref={input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyClick}
                  maxLength={18}
                />
              ) : (
                <>
                  {channels[cId].name}{" "}
                  <span className="notification__count">
                    {channelNotifications[cId] && (
                      <div>
                        {Math.ceil(channelNotifications[cId].count / 2)}
                      </div>
                    )}
                  </span>
                  {selectedChannel === cId ? (
                    <div>
                      {server.owner_id === user.id ? (
                        <>
                          <span
                            className="channel-list-create-channel-tooltip"
                            ref={editChannelRef}
                            style={{ position: "relative" }}
                            onMouseEnter={() => setEditChannelHover(true)}
                            onMouseLeave={() => setEditChannelHover(false)}
                          >
                            {server.owner_id == user.id ? (
                              <OpenModalSpan
                                modalComponent={
                                  <CreateChannelModal serverId={serverId} />
                                }
                                buttonText={
                                  <i
                                    className="fa-solid fa-pencil"
                                    onClick={(e) => handleEdit(e, cId)}
                                  ></i>
                                }
                              />
                            ) : null}
                            {editChannelHover && (
                              <CreateChannelToolTip
                                parentRef={editChannelRef}
                                serverName={"Edit channel"}
                              />
                            )}
                          </span>
                          <span
                            className="channel-list-create-channel-tooltip"
                            ref={deleteChannelRef}
                            style={{ position: "relative" }}
                            onMouseEnter={() => setDeleteChannelHover(true)}
                            onMouseLeave={() => setDeleteChannelHover(false)}
                          >
                            {server.owner_id == user.id ? (
                              <OpenModalSpan
                                modalComponent={
                                  <CreateChannelModal serverId={serverId} />
                                }
                                buttonText={
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={handleDelete}
                                  ></i>
                                }
                              />
                            ) : null}
                            {deleteChannelHover && (
                              <CreateChannelToolTip
                                parentRef={deleteChannelRef}
                                serverName={"Delete channel"}
                              />
                            )}
                          </span>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
