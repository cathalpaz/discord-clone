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

const initialState = {
    orderedServers: []
};

export default function serverReducer (state = initialState, action) {
	switch (action.type) {
		case GET_SERVERS: {
            const newState = {...state}
            const servers = action.servers.servers
            const orderedServers = [...newState.orderedServers]
            for (let server of servers) {
                newState[server.id] = server
                orderedServers.push(server.id)
            }
            newState.orderedServers = orderedServers
            return newState
        }
        case CREATE_SERVER: {
            const newState = {...state}
            newState[action.server.id] = action.server
            let orderedServers = [...newState.orderedServers]
            orderedServers.push(action.server.id)
            newState.orderedServers = orderedServers
            return newState
        }
		default:
			return state;
	}
}
