import axios from "axios";
import Swal from "sweetalert2"
import {
  GET_AUTH_USER,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOADING,
} from "../const/ActionType";

export const register = (formData) => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await axios.post("/api/auth/register", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (msg) {
      alert(msg);
    }
    Array.isArray(errors) &&
      errors.forEach((err) => {
        Swal.fire(JSON.stringify(err.msg));
      });
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const login = (formData) => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await axios.post("/api/auth/login", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (msg) {
      alert(msg);
    }
    Array.isArray(errors) &&
      errors.forEach((err) => {
        Swal.fire(JSON.stringify(err.msg));
      });
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const getAuthUser = () => async (dispatch) => {
  dispatch(loading());
  try {
    const opts = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const res = await axios.get("/api/auth/me", opts);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

const loading = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
};
//Clear Errors

export const clearErrors = () => dispatch => {
  dispatch({
    type:AUTH_ERROR
  });
};