export const initialState = null;
export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return action.payload;
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      headline: action.payload.headline,
      about: action.payload.about,
      address: action.payload.address,
    };
  }
  if (action.type === "UPDATE_PHOTO") {
    return {
      ...state,
      profile_pic: action.payload.profile_pic,
      cover_pic: action.payload.cover_pic,
    };
  }
  if (action.type === "UPDATE_EDU") {
    return {
      ...state,
      education: action.payload.education,
    };
  }
  if (action) {
    return state;
  }
};
