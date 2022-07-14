import {SET_CURRENT_USER, CLEAR_CURRENT_USER} from "../types/authTypes"
const initialState = {
    currentUser : ""
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_CURRENT_USER:
    return { ...state, ...payload }

  case CLEAR_CURRENT_USER:
    // return initialState.currentUser;
    return { ...state, currentUser : initialState.currentUser}; //? bunu ben yazdım. Hocanınki üst satır

  default:
    return state
  }
}

export default authReducer;