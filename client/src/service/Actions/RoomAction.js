import { CREATE_ROOM, DELETE_ROOM, FETCH_ROOM } from "../Constaints";
import axios from "axios";

export const createRoom = (userid) => async (dispatch, getState) => {
  await axios(`/createroom`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      fid: userid,
    }),
  });

  dispatch({
    type: CREATE_ROOM,
  });
};

export const deleteRoom = (userid) => async (dispatch, getState) => {
  await axios(`/deleteroom`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      fid: userid,
    }),
  });

  dispatch({
    type: DELETE_ROOM,
  });
};

export const fetchRoom = (userid) => async (dispatch, getState) => {
  const res = await axios(`/room/${userid}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  dispatch({
    type: FETCH_ROOM,
    payload: res.data.room,
  });
};

export const sendMessage = (roomid, message) => async (dispatch, getState) => {
  await axios(`/addmessage/${roomid}`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      message,
    }),
  });

  dispatch({
    type: FETCH_ROOM,
  });
};
