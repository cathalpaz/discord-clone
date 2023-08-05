import { actionTypes } from "./actionTypes";

// regular action creator
const getServers = (servers) => {
  return {
    type: actionTypes.GET_SERVERS,
    servers,
  };
};

const getPublicServers = (servers) => {
  return {
    type: actionTypes.GET_PUBLIC_SERVERS,
    servers,
  };
};

const createServer = (server) => {
  return {
    type: actionTypes.CREATE_SERVER,
    server,
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

export const thunkGetPublicServers = () => async (dispatch) => {
  const res = await fetch(`/api/servers`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getPublicServers(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

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
    return errorData;
  }
};

const initialState = {
  orderedServers: [],
  publicServers: [],
};
// TODO clean this monstrosity

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SERVERS: {
      const newState = structuredClone(state);
      const servers = action.servers.servers;
      const orderedServers = [...state.orderedServers];
      for (let server of servers) {
        if (newState[server.id]) {
          if (newState[server.id].public === true) {
            const existing = orderedServers.find((serv) => serv == server.id);
            if (!existing) {
              orderedServers.push(server.id);
            }
          }
        } else {
          orderedServers.push(server.id);
        }
        newState[server.id] = server;
      }
      newState.orderedServers = orderedServers;

      return newState;
    }
    case actionTypes.GET_PUBLIC_SERVERS: {
      const newState = { ...state };
      const pubServers = action.servers.servers;
      const publicServers = [...state.publicServers];
      for (let server of pubServers) {
        publicServers.push(server.id);

        newState[server.id] = server;
      }
      newState.publicServers = publicServers;
      return newState;
    }
    case actionTypes.CREATE_SERVER: {
      const newState = { ...state };
      newState[action.server.id] = action.server;
      const orderedServers = [...newState.orderedServers];
      orderedServers.push(action.server.id);
      newState.orderedServers = orderedServers;
      return newState;
    }
    case actionTypes.DELETE_SERVER: {
      const newState = { ...state };
      delete newState[action.payload.serverId];
      newState.orderedServers = newState.orderedServers.filter(
        (id) => id !== action.payload.serverId
      );
      return newState;
    }
    case actionTypes.REMOVE_SESSION: {
      const newState = initialState;
      return newState;
    }
    default:
      return state;
  }
}
