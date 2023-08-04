import { actionTypes } from "./actionTypes";

// * see store.example.json for how this state should look with data populated
const initialState = {
  // content: null,
  // id: null,
  // user_from_id: null,
  // user_to_id: null,
  // updated: null,
  // created_at: null,
  // updated_at: null
  orderedDirectMessages: [],
  users: {
    orderedUsers: [],
  },
};

const getAllDirectMessages = (dms, userId) => ({
  type: actionTypes.GET_ALL_DIRECT_MESSAGE,
  payload: {
    dms,
    userId,
  },
});

export const addDmUser = (userId, dmUser) => ({
  type: actionTypes.ADD_DM_USER,
  payload: {
    userId,
    dmUser,
  },
});

export const addDm = (dm) => ({
  type: actionTypes.ADD_DM_MESSAGE,
  payload: dm,
});
const createDirectMessage = (data) => ({
  type: actionTypes.SEND_DM_MESSAGE,
  payload: data,
});

export const thunkGetAllDirectMessages =
  (currentUserId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/@me`);
      if (res.ok) {
        const data = await res.json();
        dispatch(getAllDirectMessages(data, currentUserId));
        return data;
      }
    } catch (error) {}
  };

export const thunkSendDirectMessage =
  (userId, messageData) => async (dispatch) => {
    try {
      const res = await fetch(`/api/@me/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(createDirectMessage({ ...data, userId }));
        return { ...data, userId };
      }
    } catch (err) {
      return err;
    }
  };

export const directMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DIRECT_MESSAGE: {
      const newState = structuredClone(state);
      const userId = action.payload.userId;
      const messages = action.payload.dms.messages;
      const orderedDirectMessages = [...state.orderedDirectMessages];

      for (let message of messages) {
        let otherUserId;
        if (message.user_from_id != userId) otherUserId = message.user_from_id;
        else otherUserId = message.user_to_id;
        if (!newState.users[otherUserId]) {
          newState.users[otherUserId] = {
            [message.id]: {
              ...message,
            },
            orderedMessages: [message.id],
          };
          newState.users.orderedUsers.push(otherUserId);
          if (!newState.users[otherUserId].username) {
            newState.users[otherUserId].username =
              message.user_from_id == otherUserId
                ? message.user_from.username
                : message.user_to.username;
            // TODO FIX THIS
            newState.users[otherUserId].avatar = message.user_to.avatar;
          }
        } else {
          if (!newState.users[otherUserId][message.id]) {
            newState.users[otherUserId][message.id] = { ...message };
            newState.users[otherUserId].orderedMessages.push(message.id);
          }
          newState.users[otherUserId].orderedMessages.sort((a, b) => {
            const dateA = new Date(newState.users[otherUserId][a].created_at);
            const dateB = new Date(newState.users[otherUserId][b].created_at);
            return dateA - dateB;
          });
        }
      }
      return newState;
    }

    case actionTypes.SEND_DM_MESSAGE: {
      const newState = structuredClone(state);
      const { userId, message } = action.payload;

      if (newState.users[userId]) {
        newState.users[userId][message.id] = {
          ...message,
        };
        newState.users[userId].orderedMessages.push(message.id);
      }
      return newState;
    }
    case actionTypes.ADD_DM_MESSAGE: {
      const newState = structuredClone(state);
      const { message } = action.payload;

      if (newState.users[message.user_from_id]) {
        newState.users[message.user_from.id][message.id] = {
          ...message,
        };
        newState.users[message.user_from_id].orderedMessages.push(message.id);
      }
      return newState;
    }
    case actionTypes.ADD_DM_USER: {
      const newState = structuredClone(state);
      const { userId, dmUser } = action.payload;
      console.log("THIS IS THE USERID ", userId);
      if (!newState.users[userId]) {
        newState.users[userId] = {
          username: dmUser.username,
          avatar: dmUser.avatar,
          orderedMessages: [],
        };
        newState.users.orderedUsers.unshift(userId);
      }
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
