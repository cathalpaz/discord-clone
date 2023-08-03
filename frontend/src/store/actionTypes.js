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
const SEND_FRIEND_REQUEST = "session/sendFriendRequest"

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
  UPDATE_USER_STATUS,
  SEND_FRIEND_REQUEST,
};
