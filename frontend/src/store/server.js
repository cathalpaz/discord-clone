// constants
const GET_SERVERS = "server/GET_SERVERS";

// regular action creator
const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers
    }
}

// thunk action creator
export const thunkGetAllServers = () => async (dispatch) => {
    const res = await fetch(`/api/servers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getServers(data))
        return data
    }
}

const initialState = {};

export default function serverReducer (state = initialState, action) {
	switch (action.type) {
		case GET_SERVERS:
            const newState = action.servers.servers
            return newState
		default:
			return state;
	}
}
