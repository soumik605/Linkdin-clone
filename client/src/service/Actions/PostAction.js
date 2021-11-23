import {
  COMMENT_A_POST,
  CREATE_A_POST,
  DELETE_A_COMMENT,
  DELETE_A_POST,
  EDIT_A_POST,
  FETCH_A_POST,
  FETCH_SUB_POSTS,
  LIKE_A_POST,
  UNLIKE_A_POST,
} from "../Constaints";
import axios from "axios";

export const fetchSubPosts = () => async (dispatch, getState) => {
  const response = await axios.get(`/allsubpost`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });

  dispatch({
    type: FETCH_SUB_POSTS,
    payload: response.data.result,
  });
};

export const likeAPost = (postId) => async (dispatch, getState) => {
  await axios("/like", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      postId,
    }),
  });

  dispatch({
    type: LIKE_A_POST,
  });
};

export const unlikeAPost = (postId) => async (dispatch, getState) => {
  await axios("/unlike", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      postId,
    }),
  });

  dispatch({
    type: UNLIKE_A_POST,
  });
};

export const commentAPost = (postId, text) => async (dispatch, getState) => {
  await axios("/comment", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      postId,
      text,
    }),
  });

  dispatch({
    type: COMMENT_A_POST,
  });
};

export const deleteAPost = (postid) => async (dispatch, getState) => {
  await axios(`/deletepost/${postid}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });

  dispatch({
    type: DELETE_A_POST,
  });
};

export const fetchAPost = (postid) => async (dispatch, getState) => {
  const res = await axios(`/post/${postid}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });


  dispatch({
    type: FETCH_A_POST,
    payload: {
      likes: res.data.post.likes,
      comments: res.data.post.comments,
    },
  });
};

export const deleteAComment = (postId, commentId) => async (dispatch, getState) => {
  await axios("/deletecomment", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      postId,
      commentId,
    }),
  });

  dispatch({
    type: DELETE_A_COMMENT,
    payload: commentId
  });
};

export const createAPost = (title, photoUrl) => async (dispatch, getState) => {
  await  axios("/createpost", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      title,
      photo: photoUrl,
    }),
  })

  dispatch({
    type: CREATE_A_POST,
  });
};

export const editAPost = (title, photoUrl,postId) => async (dispatch, getState) => {
  await  axios(`/editpost/${postId}`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    data: JSON.stringify({
      title,
      photo: photoUrl,
    }),
  })

  dispatch({
    type: EDIT_A_POST,
  });
};