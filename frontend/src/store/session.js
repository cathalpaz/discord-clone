import { actionTypes } from "./actionTypes";

const initialState = { user: null, friends: null };

const setUser = (user) => ({
  type: actionTypes.SET_SESSION,
  payload: user,
});

const removeUser = () => ({
  type: actionTypes.REMOVE_SESSION,
});

const setFriends = (friends) => ({
  type: actionTypes.SET_FRIENDS,
  payload: friends,
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
    default:
      return state;
  }
}
