import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import postsReducer from './postsReducers'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  postData: postsReducer
});
export default rootReducer;

