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

const initialState = {
  userPosts: [],
  userDetails: null,
  myDetails: null,
  allUser: [],
  currentUser: null,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };

    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case REQUEST_CONNECTION:
      return state;

    case WITHDRAW_CONNECTION:
      return state;

    case REJECT_CONNECTION:
      return state;

    case ACCEPT_CONNECTION:
      return state;

    case REMOVE_CONNECTION:
      return state;

    case MY_DETAILS:
      return {
        ...state,
        myDetails: action.payload,
      };

    case ALL_USER:
      return {
        ...state,
        allUser: action.payload,
      };

    case EDIT_DETAILS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case ADD_SKILL:
      return {
        ...state,
        currentUser: action.payload,
      };

    case DELETE_SKILL:
      return {
        ...state,
        currentUser: action.payload,
      };

    case ADD_EDUCATION:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UPDATE_EDUCATION:
      return {
        ...state,
        currentUser: action.payload,
      };

    case DELETE_EDUCATION:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
}
