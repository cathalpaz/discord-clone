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
    channel
  }
}

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

export const thunkGetServerInfo = (serverId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/servers/${serverId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.server.channels.length) {
        dispatch(updateSelectedChannelId(data.server.channels[0].id));
      }
      dispatch(getSingleServer(data.server));
    }
  } catch (err) {
    console.log(err);
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

export const thunkEditChannel = (channel) => async(dispatch) => {
  const res = await fetch(`/api/channels/${channel.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channel)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(editChannel(data))
    dispatch(updateSelectedChannelId(data.id));
    return data
  } else {
    const errorData = await res.json();
    return errorData;
  }
}

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
    console.log(err);
  }
};

export const thunkUpdateSingleServer = (serverId, serverForm) => async (dispatch) => {
  console.log('serverid', serverId)
  console.log('serverform', serverForm)
  try {
    const res = await fetch(`/api/servers/${serverId}`, {
      method: "PUT",
      body: serverForm
    })
    if (res.ok) {
      const data = await res.json()
      dispatch(updateSingleServer(data))
    }
  } catch (err) {
    console.log(err);
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
      // const newState = {...state}
      // newState.channels = {...newState.channels, orderedChannelsList: ... }
      const newState = structuredClone(state)
      const { channel } = action.channel
      console.log('1111', action.channel.channel);
      newState.channels[channel.id] = channel
      return newState
    }
    case actionTypes.DELETE_SERVER: {
      return initialState;
    }
    case actionTypes.UPDATE_SERVER: {
      const newState = {...state}
      console.log('newstate', newState)
      newState["name"] = action.payload.server.name
      newState["public"] = action.payload.server.public
      newState["avatar"] = action.payload.server.avatar
      return newState
    }
    default: {
      return state;
    }
  }
};
