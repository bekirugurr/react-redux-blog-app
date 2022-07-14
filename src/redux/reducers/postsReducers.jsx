import { SET_POSTS_LIST, CLEAR_POSTS_LIST } from "../types/postsTypes";

const initialState = {
    nextPage: null,
    previousPage: null,
    postsList: [],
  };
  
  const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_POSTS_LIST:
        return { ...state, newsList: payload };
      case CLEAR_POSTS_LIST:
        return initialState;
      default:
        return state;
    }
  };
  export default newsReducer;
