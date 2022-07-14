import { SET_POSTS_DATA, CLEAR_POSTS_DATA } from "../types/postsTypes";

const initialState = {
    nextPage: null,
    previousPage: null,
    postsList: [],
  };
  
  const postsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_POSTS_DATA:
        return { ...state, postsList: payload.postsList, nextPage: payload.nextPage,previousPage: payload.previousPage };
      case CLEAR_POSTS_DATA:
        return initialState;
      default:
        return state;
    }
  };

  export default postsReducer;
