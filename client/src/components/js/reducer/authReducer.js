import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_AUTH_USER,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    LOADING,
  } from "../const/ActionType";
  
  const initState = {
    token: localStorage.getItem("token"),
    user: null,
    isLoading: true,
    isAuth: false,
    msg: null,
    errors: null,
  };
  
  export default function authReducer(state = initState, { type, payload }) {
    switch (type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.token);
      case GET_AUTH_USER:
        return { ...state, ...payload, isAuth: true, isLoading: false };
  
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case AUTH_ERROR:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuth: false,
          user: null,
          isLoading: false,
         
        };
        
      case LOADING:
        return { ...state, isLoading: true };
      default:
        return state;
    }
  }
  