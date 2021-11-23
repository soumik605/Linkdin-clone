import { CREATE_ROOM, DELETE_ROOM, FETCH_ROOM } from "../Constaints";

const initialState = {
  room: null,
};

export default function RoomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return state;

    case DELETE_ROOM:
      return state;

    case FETCH_ROOM:
      return {
        ...state,
        room: action.payload,
      };

    default:
      return state;
  }
}
