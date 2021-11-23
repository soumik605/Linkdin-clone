import { CLEAR_DATA, LOGIN_USER, SIGNUP_USER } from "../Constaints";
import axios from "axios";

export const loginUser = (details) => async (dispatch, getState) => {
  const res = await axios("/signin", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      email: details.email,
      password: details.password,
    }),
  });

  if (res.data.user && res.data.token) {
    dispatch({
      type: LOGIN_USER,
      payload: {
        token: res.data.token,
        user: res.data.user,
        error: "",
      },
    });
  } else if (res.data.error) {
    dispatch({
      type: LOGIN_USER,
      payload: {
        token: "",
        user: null,
        error: res.data.error,
      },
    });
  }
};

export const clearData = () => async (dispatch, getState) => {
  dispatch({
    type: CLEAR_DATA,
  });
};

export const signupUser = (details) => async (dispatch, getState) => {
  const res = await axios("/signup", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      name: details.name,
      email: details.email,
      password: details.password,
      address: details.address,
      profile_pic: details.image,
    }),
  });

  if (res.data.error) {
    dispatch({
      type: SIGNUP_USER,
      payload: {
        error: res.data.error,
        message: "",
      },
    });
  } else if (res.data.message) {
    dispatch({
      type: SIGNUP_USER,
      payload: {
        error: "",
        message: res.data.message,
      },
    });
  }
};
