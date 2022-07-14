import { SET_USER, CLEAR_USER} from "../types/authTypes";

export const setCurrentUser = (user) => ({
  type: SET_USER,
  payload: user
})
export const clearCurrentUser = () => ({
  type: CLEAR_USER
})
