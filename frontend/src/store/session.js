import { actionTypes } from "./actionTypes";

const initialState = { user: null, friends: null };

const setUser = (user) => ({
  type: actionTypes.SET_SESSION,
  payload: user,
});
const updateUser = (user) => ({
  type: actionTypes.UPDATE_USER,
  payload: user,
});

const removeUser = () => ({
  type: actionTypes.REMOVE_SESSION,
});

const setFriends = (friends) => ({
  type: actionTypes.SET_FRIENDS,
  payload: friends,
});

const sendFriendRequest = (friendRequest) => ({
  type: actionTypes.SEND_FRIEND_REQUEST,
  payload: {
    friendRequest,
  },
});

const acceptFriendRequest = (friend) => ({
  type: actionTypes.ACCEPT_FRIEND_REQUEST,
  payload: {
    friend,
  },
});

const rejectFriendRequest = (friendId) => ({
  type: actionTypes.REJECT_FRIEND_REQUEST,
  payload: {
    friendId,
  },
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (credentials, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credentials,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkUpdateUser = (userFormData, userId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      body: userFormData,
    });
    console.log("hi");
    if (res.ok) {
      const data = await res.json();

      dispatch(updateUser(data));
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const thunkSendFriendRequest = (username) => async (dispatch) => {
  try {
    const res = await fetch(`/api/@me/friends/${username}/send-request`, {
      method: "POST",
      body: JSON.stringify(username),
    });
    if (res.ok) {
      const data = await res.json();

      dispatch(sendFriendRequest(data.friend));
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const thunkRejectFriendRequest = (username) => async (dispatch) => {
  try {
    const res = await fetch(`/api/@me/friends/${username}/reject-request`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      console.log("THIS IS THEE DATA", data);
      dispatch(rejectFriendRequest(data.friend));
      return data;
    }
  } catch (err) {
    console.log("there was an errork", err);
    return err;
  }
};

export const thunkAcceptFriendRequest = (username) => async (dispatch) => {
  try {
    const res = await fetch(`/api/@me/friends/${username}/accept-request`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      console.log("this is the data");
      dispatch(acceptFriendRequest(data.friend));
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (userFormData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: userFormData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const fetchFriends = () => async (dispatch) => {
  try {
    const response = await fetch("/api/@me/friends");
    if (response.ok) {
      const data = await response.json();
      const friends = data.friends;
      dispatch(setFriends(friends));
    } else {
      throw new Error("Failed to fetch friends data");
    }
  } catch (error) {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return { ...state, user: action.payload };
    case actionTypes.REMOVE_SESSION:
      return { ...state, user: null };
    case actionTypes.SET_FRIENDS:
      return { ...state, friends: action.payload };
    case actionTypes.UPDATE_USER: {
      const newState = structuredClone(state);
      const user = action.payload;
      newState.user = { ...newState.user, ...user };
      return newState;
    }
    case actionTypes.SEND_FRIEND_REQUEST: {
      const newState = structuredClone(state);
      const { friendRequest } = action.payload;
      const existingFriend = newState.friends.find(
        (friend) => friend.username == friendRequest.user.username
      );
      if (!existingFriend) {
        newState.friends.push(friendRequest);
      }
      return newState;
    }
    case actionTypes.ACCEPT_FRIEND_REQUEST: {
      const newState = structuredClone(state);
      const { friend } = action.payload;
      const existingFriend = newState.friends.findIndex(
        (f) => f.user.username == friend.user.username
      );
      if (existingFriend !== -1) {
        newState.friends[existingFriend] = friend;
      }
      return newState;
    }
    case actionTypes.REJECT_FRIEND_REQUEST: {
      const newState = structuredClone(state);
      const { friendId } = action.payload;
      console.log("this is the payload", action.payload);
      console.log("this is the friend from the payload", friendId);
      // Remove from friends list or just change status to rejected? Just gonna change to rejected right now
      const pendingFriend = newState.friends.find((f) => f.id == friendId);
      if (pendingFriend) {
        pendingFriend.status = "REJECTED";
      }
      console.log("this is the pending friend now", pendingFriend);
      return newState;
    }
    default:
      return state;
  }
}
