// constants
const GET_SERVERS = "server/GET_SERVERS";
const CREATE_SERVER = "server/CREATE_SERVER";

// regular action creator
const getServers = (servers) => {
  return {
    type: GET_SERVERS,
    servers,
  };
};

const createServer = (server) => {
    return {
        type: CREATE_SERVER,
        server
    }
}


// thunk action creator
export const thunkGetAllServers = () => async (dispatch) => {
  const res = await fetch(`/api/servers/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getServers(data));
    return data;
  }
};

export const thunkCreateServer = (server) => async (dispatch) => {
    const res = await fetch('/api/servers/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(server)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(createServer(data))
        return data
    } else {
        const errorData = await res.json()
        return errorData
    }
}

const initialState = {};

export default function serverReducer (state = initialState, action) {
	switch (action.type) {
		case GET_SERVERS: {
            const newState = action.servers.servers
            return newState
        }
        case CREATE_SERVER: {
            const newState = {...state}
            newState["servers"] = action.server
            return newState
        }
		default:
			return state;
	}
}
