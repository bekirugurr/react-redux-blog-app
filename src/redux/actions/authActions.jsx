import { SET_USER, CLEAR_USER, UPDATE_USER} from "../types/authTypes";

export const setCurrentUser = (payload) => ({
  type: SET_USER,
  payload: payload
})
export const updateCurrentUser = (user) => ({
  type: UPDATE_USER,
  payload: user
})
export const clearCurrentUser = () => ({
  type: CLEAR_USER
})
