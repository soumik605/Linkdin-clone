import {
  CREATE_A_POST,
  DELETE_A_COMMENT,
  EDIT_A_POST,
  FETCH_A_POST,
  FETCH_SUB_POSTS,
  LIKE_A_POST,
  UNLIKE_A_POST,
} from "../Constaints";

const initialState = {
  subPosts: [],
  postComments: [],
  postLikes: [],
};

export default function PostReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUB_POSTS:
      return {
        ...state,
        subPosts: action.payload,
      };

    case LIKE_A_POST:
      return state;

    case UNLIKE_A_POST:
      return state;

    case FETCH_A_POST:
      return {
        ...state,
        postComments: action.payload.comments,
        postLikes: action.payload.likes,
      };

    case DELETE_A_COMMENT:
      return {
        ...state,
        postComments: state.postComments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case CREATE_A_POST:
      return state;

    case EDIT_A_POST:
      return state;

    default:
      return state;
  }
}
