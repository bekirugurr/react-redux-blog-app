import {SET_USER, CLEAR_USER} from "../types/authTypes"
const initialState = {
    user : "",
    key : ""
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_USER:
    return { ...state, ...payload }
  case CLEAR_USER:
    return initialState;
  default:
    return state
  }
}

export default authReducer;