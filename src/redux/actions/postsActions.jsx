import { SET_POSTS_LIST, CLEAR_POSTS_LIST } from "../types/postsTypes";


export const setPostsList = (postsData) => ({
    type: SET_NEWS_LIST,
    payload: postsData,
  });
  
  export const clearPostssList = () => ({
    type: CLEAR_NEWS_LIST,
  });
  
