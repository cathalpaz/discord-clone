const SET_SESSION = "session/setUserData";
const REMOVE_SESSION = "session/removeUserData";
const UPDATE_CHANNEL_ID = "singleServer/updateChannelId";
const SET_SERVER_INFO = "singleServer/setServerInfo";
const ADD_CHANNEL = "singleServer/addChannel";
const DELETE_SERVER = "singleServer/deleteSingleServer";
const UPDATE_SERVER = "singleServer/updateSingleServer";
const EDIT_CHANNEL = "singleServer/editChannel";
const SET_FRIENDS = "session/setFriends";
const UPDATE_USER = "session/updateUserData";
const DELETE_CHANNEL = "singleServer/deleteChannel";
const GET_ALL_DIRECT_MESSAGE = "directMessages/getAllDirectMessages";
const SEND_CHANNEL_MESSAGE = "singleServer/addChannelMessage";
const UPDATE_USER_STATUS = "singleServer/updateUserStatus";
const EDIT_CHANNEL_MESSAGE = "singleServer/editChannelMessage";
const SEND_DM_MESSAGE = "session/sendDmMessage";
const ADD_DM_MESSAGE = "session/addDmMessage";
const SEND_FRIEND_REQUEST = "session/sendFriendRequest";
const GET_SERVERS = "server/GET_SERVERS";
const GET_PUBLIC_SERVERS = "server/GET_PUBLIC";
const CREATE_SERVER = "server/CREATE_SERVER";
const ACCEPT_FRIEND_REQUEST = "session/acceptFriendRequest";
const REJECT_FRIEND_REQUEST = "session/rejectFriendRequest";
const DELETE_CHANNEL_MESSAGE = "singleServer/deleteChannelMessage";
const ADD_DM_USER = "directMessages/addUser";

export const actionTypes = {
  SET_SESSION,
  REMOVE_SESSION,
  UPDATE_CHANNEL_ID,
  SET_SERVER_INFO,
  SET_FRIENDS,
  ADD_CHANNEL,
  EDIT_CHANNEL,
  DELETE_SERVER,
  UPDATE_SERVER,
  UPDATE_USER,
  DELETE_CHANNEL,
  GET_ALL_DIRECT_MESSAGE,
  SEND_CHANNEL_MESSAGE,
  EDIT_CHANNEL_MESSAGE,
  UPDATE_USER_STATUS,
  SEND_DM_MESSAGE,
  ADD_DM_MESSAGE,
  SEND_FRIEND_REQUEST,
  GET_SERVERS,
  GET_PUBLIC_SERVERS,
  CREATE_SERVER,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  DELETE_CHANNEL_MESSAGE,
  ADD_DM_USER,
};
