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
    method: 'POST',
    body: JSON.stringify(channel),
    headers: {'Content-Type': 'application/json'}
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(addChannel(data))
    dispatch(updateSelectedChannelId(data.id))
    return data
  } else {
    const errorData = await res.json()
    return errorData
  }
}


export const singleServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHANNEL_ID: {
      const newState = { ...state };
      newState.selectedChannelId = action.payload;
      return newState;
    }
    case actionTypes.SET_SERVER_INFO: {
      const serverInfo = action.payload;
      const newState = { ...state, ...serverInfo };
      const channelsArray = serverInfo.channels;
      newState.channels = {
        orderedChannelsList: channelsArray,
      };
      for (let channel of channelsArray) {
        newState.channels[channel.id] = {
          ...channel,
        };
      }
      return newState;
    }
    case actionTypes.ADD_CHANNEL: {
      const newState = { ...state }
      // console.log('state:', newState);
      newState.channels[action.channel.id] = action.channel
      newState.channels.orderedChannelsList = [...newState.channels.orderedChannelsList, action.channel]

      return newState
    }
    default: {
      return state;
    }
  }
};
