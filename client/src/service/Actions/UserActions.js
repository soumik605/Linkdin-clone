import {
  FETCH_USER_DETAILS,
  FETCH_USER_POSTS,
  REQUEST_CONNECTION,
  WITHDRAW_CONNECTION,
  REJECT_CONNECTION,
  ACCEPT_CONNECTION,
  REMOVE_CONNECTION,
  MY_DETAILS,
  ALL_USER,
  EDIT_DETAILS,
  ADD_SKILL,
  DELETE_SKILL,
  ADD_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_EDUCATION,
} from "../Constaints";
import axios from "axios";

export const fetchUserPosts = (userid) => async (dispatch, getState) => {
  const response = await axios.get(`/mypost/${userid}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  dispatch({
    type: FETCH_USER_POSTS,
    payload: response.data.posts,
  });
};

export const fetchUserDetails = (userid) => async (dispatch, getState) => {
  const response = await axios.get(`/user/${userid}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });

  dispatch({
    type: FETCH_USER_DETAILS,
    payload: response.data.user,
  });
};

export const requestConnection = (userid) => async (dispatch, getState) => {
  const response = await axios(`/reqconnect/${userid}`, {
    method: "put",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  localStorage.setItem("user", JSON.stringify(response.data.result2));
  dispatch({
    type: REQUEST_CONNECTION,
    payload: response.data,
  });
};

export const withdrawConnection = (userid) => async (dispatch, getState) => {
  const response = await axios(`/withdrawreq/${userid}`, {
    method: "put",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  localStorage.setItem("user", JSON.stringify(response.data.result1));
  dispatch({
    type: WITHDRAW_CONNECTION,
    payload: response.data,
  });
};

export const rejectConnection = (userid) => async (dispatch, getState) => {
  const response = await axios(`/rejectconnect/${userid}`, {
    method: "put",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  localStorage.setItem("user", JSON.stringify(response.data.result1));
  dispatch({
    type: REJECT_CONNECTION,
    payload: response.data,
  });
};

export const acceptConnection = (userid) => async (dispatch, getState) => {
  const response = await axios(`/acceptconnect/${userid}`, {
    method: "put",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  localStorage.setItem("user", JSON.stringify(response.data.result1));
  dispatch({
    type: ACCEPT_CONNECTION,
    payload: response.data,
  });
};

export const removeConnection = (userid) => async (dispatch, getState) => {
  const response = await axios(`/removeconnect/${userid}`, {
    method: "put",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  localStorage.setItem("user", JSON.stringify(response.data.result1));
  dispatch({
    type: REMOVE_CONNECTION,
    payload: response.data,
  });
};

export const myDetails = () => async (dispatch, getState) => {
  const response = await axios(`/mydetails`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });

  dispatch({
    type: MY_DETAILS,
    payload: response.data.user,
  });
};

export const allUser = () => async (dispatch, getState) => {
  const response = await axios(`/alluser`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  dispatch({
    type: ALL_USER,
    payload: response.data.users,
  });
};

export const editDetails = (userDetails) => async (dispatch, getState) => {
  const response = await axios("/editdetails", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      name: userDetails.name,
      email: userDetails.email,
      address: userDetails.address,
      about: userDetails.about,
      headline: userDetails.headline,
      profile_pic: userDetails.profile_pic,
      cover_pic: userDetails.cover_pic,
    }),
  });

  if (response.data.error) {
    console.log(response.data.error);
  } else {
    dispatch({
      type: EDIT_DETAILS,
      payload: response.data.user,
    });
  }
};

export const addSkill = (newSkill) => async (dispatch, getState) => {
  const response = await axios(`/addskill`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      skill: newSkill,
    }),
  });

  dispatch({
    type: ADD_SKILL,
    payload: response.data.user,
  });
};

export const deleteSkill = (newSkills) => async (dispatch, getState) => {
  const response = await axios(`/deleteskill`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      newSkills,
    }),
  });

  dispatch({
    type: DELETE_SKILL,
    payload: response.data.user,
  });
};

export const addEducation = (education) => async (dispatch, getState) => {
  const response = await axios("/addeducation", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      education,
    }),
  });

  dispatch({
    type: ADD_EDUCATION,
    payload: response.data.user,
  });
};

export const updateEducation = (education) => async (dispatch, getState) => {
  const response = await axios("/updateeducation", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      education,
    }),
  });

  dispatch({
    type: UPDATE_EDUCATION,
    payload: response.data.user,
  });
};

export const deleteEducation = (education) => async (dispatch, getState) => {
  const response = await axios("/deleteeducation", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      education,
    }),
  });

  dispatch({
    type: DELETE_EDUCATION,
    payload: response.data.user,
  });
};

