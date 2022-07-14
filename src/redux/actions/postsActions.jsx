import { SET_POSTS_DATA, CLEAR_POSTS_DATA } from "../types/postsTypes";


export const setPostsData = (postsData) => ({
    type: SET_POSTS_DATA,
    payload: postsData,
  });
  
  export const clearPostsData = () => ({
    type: CLEAR_POSTS_DATA,
  });
  
