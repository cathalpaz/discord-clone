import { actionTypes } from "./actionTypes";

// * see store.example.json for how this state will look with data populated
const initialState = {
  id: null,
  name: null,
  avatar: null,
  owner_id: null,
  created_at: null,
  public: null,
  selectedChannelId: null,
  users: null,
  channels: null,
};

export const addChannel = (channel) => {
  return {
    type: actionTypes.ADD_CHANNEL,
    channel,
  };
};

export const editChannel = (channel) => {
  return {
    type: actionTypes.EDIT_CHANNEL,
    channel,
  };
};

export const deleteChannel = (channelId) => {
  return {
    type: actionTypes.DELETE_CHANNEL,
    channelId,
  };
};

export const updateSelectedChannelId = (id) => ({
  type: actionTypes.UPDATE_CHANNEL_ID,
  payload: id,
});

const getSingleServer = (serverData) => ({
  type: actionTypes.SET_SERVER_INFO,
  payload: serverData,
});

const deleteSingleServer = (serverId) => ({
  type: actionTypes.DELETE_SERVER,
  payload: serverId,
});

const updateSingleServer = (serverId) => ({
  type: actionTypes.UPDATE_SERVER,
  payload: serverId,
});

export const updateChannelMessages = (data) => ({
  type: actionTypes.SEND_CHANNEL_MESSAGE,
  payload: data,
});

export const updateUserStatus = (data) => ({
  type: actionTypes.UPDATE_USER_STATUS,
  payload: data,
});

export const updateSingleChannelMessage = (data) => ({
  type: actionTypes.EDIT_CHANNEL_MESSAGE,
  payload: data,
});

export const deleteSingleChannelMessage = (channelId, messageId) => ({
  type: actionTypes.DELETE_CHANNEL_MESSAGE,
  payload: {
    messageId,
    channelId,
  },
});

export const thunkGetServerInfo =
  (serverId, selectedChannelId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/servers/${serverId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.server.channels.length && !selectedChannelId) {
          dispatch(updateSelectedChannelId(data.server.channels[0].id));
        }
        dispatch(getSingleServer(data.server));
      }
    } catch (err) {}
  };

export const thunkDeleteChannelMessage =
  (channelId, messageId) => async (dispatch) => {
    try {
      const res = await fetch(
        `/api/channels/${channelId}/messages/${messageId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const data = await res.json();
        dispatch(deleteSingleChannelMessage(channelId, messageId));
      }
    } catch (err) {
      return err;
    }
  };

export const thunkCreateChannel = (serverId, channel) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    body: JSON.stringify(channel),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addChannel(data));
    dispatch(updateSelectedChannelId(data.id));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkEditChannel = (channel) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channel.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channel),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editChannel(data));
    dispatch(updateSelectedChannelId(data.id));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteChannel(data));
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkDeleteSingleServer = (serverId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/servers/${serverId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(deleteSingleServer(data));
    }
  } catch (err) {
    return err;
  }
};

export const thunkUpdateSingleServer =
  (serverId, serverForm) => async (dispatch) => {
    try {
      const res = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        body: serverForm,
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateSingleServer(data));
      }
    } catch (err) {
      return err;
    }
  };

export const singleServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHANNEL_ID: {
      const newState = { ...state };
      newState.selectedChannelId = action.payload;
      return newState;
    }
    case actionTypes.SET_SERVER_INFO: {
      const serverInfo = action.payload;
      const newState = structuredClone({ ...state, ...serverInfo });
      const channelsArray = serverInfo.channels;
      newState.channels = {
        orderedChannelsList: channelsArray.map((chan) => chan.id),
      };
      for (let channel of channelsArray) {
        newState.channels[channel.id] = {
          ...channel,
        };
      }
      return newState;
    }
    case actionTypes.ADD_CHANNEL: {
      const newState = { ...state };
      newState.channels[action.channel.id] = action.channel;
      newState.channels.orderedChannelsList = [
        ...newState.channels.orderedChannelsList,
        action.channel.id,
      ];

      return newState;
    }
    case actionTypes.EDIT_CHANNEL: {
      const newState = structuredClone(state);
      const { channel } = action.channel;
      newState.channels[channel.id] = channel;
      return newState;
    }
    case actionTypes.DELETE_CHANNEL: {
      const newState = { ...state };
      delete newState.channels[action.channelId];
      const newOrdered = newState.channels.orderedChannelsList.filter(
        (n) => n !== action.channelId
      );
      newState.channels.orderedChannelsList = newOrdered;
      return newState;
    }
    case actionTypes.DELETE_SERVER: {
      return initialState;
    }
    case actionTypes.UPDATE_SERVER: {
      const newState = { ...state };
      newState["name"] = action.payload.server.name;
      newState["public"] = action.payload.server.public;
      newState["avatar"] = action.payload.server.avatar;
      return newState;
    }
    // TODO not a good way to do this, come back to this
    case actionTypes.SEND_CHANNEL_MESSAGE: {
      const newState = structuredClone(state);
      const { channel_id } = action.payload;
      if (newState.channels[channel_id]) {
        const oldMessageIdx = newState.channels[channel_id].messages.findIndex(
          (msg) => msg.id == action.payload.id
        );
        if (oldMessageIdx !== -1) {
          newState.channels[channel_id].messages[oldMessageIdx] = {
            ...action.payload,
          };
          return newState;
        }
        const oldMessages = newState.channels[channel_id].messages;
        newState.channels[channel_id].messages = [
          ...oldMessages,
          { ...action.payload },
        ];
      }
      return newState;
    }
    case actionTypes.UPDATE_USER_STATUS: {
      const newState = structuredClone(state);
      const { user_id, status } = action.payload;
      if (newState.users) {
        const usr = newState.users.find((user) => user.id == user_id);
        if (usr) {
          usr.status = status;
        }
      }
      return newState;
    }
    case actionTypes.DELETE_CHANNEL_MESSAGE: {
      const newState = structuredClone(state);
      const { messageId, channelId } = action.payload;
      newState.channels[channelId].messages = newState.channels[
        channelId
      ].messages.filter((msg) => msg.id != messageId);

      return newState;
    }
    case actionTypes.REMOVE_SESSION: {
      const newState = initialState;
      return newState;
    }
    default: {
      return state;
    }
  }
};
