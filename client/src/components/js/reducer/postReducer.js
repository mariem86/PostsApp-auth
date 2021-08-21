import {
    ADD_POST,
    REMOVE_POST,
    GET_POSTS,
    GET_POSTS_BY_USERID,
    LOAD_POSTS,
    CLEAR_POSTS,
    GET_NEXT_POSTS,
  } from "../const/ActionType";
  
  const initState = {
    posts: [],
    isLoading: false,
    startIndex: 0,
    hasMore: true,
  };
  
  export default function authReducer(state = initState, { type, payload }) {
    switch (type) {
      case GET_NEXT_POSTS:
        return { ...state, startIndex: state.startIndex + 2 };
      case GET_POSTS:
      case GET_POSTS_BY_USERID:
        return {
          ...state,
          posts: [...state.posts, ...payload.posts],
          isLoading: false,
          hasMore: payload.hasMore,
        };
      case LOAD_POSTS:
      case ADD_POST:
        return { ...state, isLoading: true };
      case REMOVE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== payload),
        };
      case CLEAR_POSTS:
        return { ...state, posts: [], startIndex: 0, hasMore: true };
  
      default:
        return state;
    }
  }
  