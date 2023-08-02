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
};

const getAllDirectMessages = (dms) => ({
  type: actionTypes.GET_ALL_DIRECT_MESSAGE,
  payload: dms,
});

export const thunkGetAllDirectMessages = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/@me`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDirectMessages(data));
      return data;
    }
  } catch (error) {
    console.log(error)
  }
};

export const directMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DIRECT_MESSAGE: {
      const newState = { ...state }
      const messages = action.payload.messages;
      const orderedDirectMessages = [...state.orderedDirectMessages]
      for (let message of messages) {
        if (!newState[message.id]) {
          orderedDirectMessages.push(message.id)
        }
        newState[message.id] = message
      }
      newState.orderedDirectMessages = orderedDirectMessages
      return newState;
    }
    default: {
      return state;
    }
  }
};
