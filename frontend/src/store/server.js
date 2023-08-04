import { actionTypes } from "./actionTypes";

// constants
const GET_SERVERS = "server/GET_SERVERS";
const GET_PUBLIC_SERVERS = "server/GET_PUBLIC"
const CREATE_SERVER = "server/CREATE_SERVER";
const REMOVE_SERVERS = "server/REMOVE_SERVERS"

// regular action creator
const getServers = (servers) => {
  return {
    type: GET_SERVERS,
    servers,
  };
};

const getPublicServers = (servers) => {
  return {
    type: GET_PUBLIC_SERVERS,
    servers
  }
}

const createServer = (server) => {
  return {
    type: CREATE_SERVER,
    server,
  };
};

export const removeServers = (server) => {
  return {
    type: REMOVE_SERVERS,
    server
  };
};

// thunk action creator
export const thunkGetAllServers = () => async (dispatch) => {
  const res = await fetch(`/api/servers/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getServers(data));
    return data;
  }
};

export const thunkGetPublicServers = () => async(dispatch) => {
  const res = await fetch(`/api/servers`);
  if (res.ok) {
    const data = await res.json()
    dispatch(getPublicServers(data))
    return data
  } else {
    const errorData = await res.json();
    console.log('error?');
    return errorData;
  }
}


export const thunkCreateServer = (serverForm) => async (dispatch) => {
  const res = await fetch("/api/servers/new", {
    method: "POST",
    body: serverForm,
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createServer(data));
    return data;
  } else {
    const errorData = await res.json();
    console.log(errorData);
    return errorData;
  }
};

const initialState = {
  orderedServers: [],
  publicServers: []
};

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVERS: {
      const newState = { ...state };
      const servers = action.servers.servers;
      const orderedServers = [...state.orderedServers];
      for (let server of servers) {
        if (!newState[server.id]) {
          orderedServers.push(server.id);
        }
        newState[server.id] = server;
      }
      newState.orderedServers = orderedServers;
      return newState;
    }
    case GET_PUBLIC_SERVERS: {
      const newState = {...state}
      const pubServers = action.servers.servers;
      const publicServers = [...state.publicServers]
      for (let server of pubServers) {
        publicServers.push(server.id)

        newState[server.id] = server
      }
      newState.publicServers = publicServers
      return newState
    }
    case CREATE_SERVER: {
      const newState = { ...state };
      newState[action.server.id] = action.server;
      const orderedServers = [...newState.orderedServers];
      orderedServers.push(action.server.id);
      newState.orderedServers = orderedServers;
      return newState;
    }
    case actionTypes.DELETE_SERVER: {
      const newState = { ...state }
      delete newState[action.payload.serverId]
      newState.orderedServers = newState.orderedServers.filter((id) => id !== action.payload.serverId)
      return newState
    }
    case actionTypes.REMOVE_SESSION: {
      const newState = initialState
      return newState
    }
    default:
      return state;
  }
}
