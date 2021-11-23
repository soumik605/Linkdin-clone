import { CLEAR_DATA, LOGIN_USER, SIGNUP_USER } from "../Constaints";

const initialState = {
  loginUserData: null,
  token: "",
  loginError: "",
  signupError: "",
  signupMessage: "",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserData: action.payload.user,
        token: action.payload.token,
        loginError: action.payload.error,
      };

    case CLEAR_DATA:
      return {
        ...state,
        loginUserData: null,
        token: "",
        loginError: "",
      };

    case SIGNUP_USER:
      return {
        ...state,
        signupError: action.payload.error ,
        signupMessage: action.payload.message ,
      };

    default:
      return state;
  }
}
