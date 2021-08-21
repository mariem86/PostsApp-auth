import axios from "axios";
import {
  GET_POSTS,
  GET_POSTS_BY_USERID,
  REMOVE_POST,
  LOAD_POSTS,
  CLEAR_POSTS,
  ADD_POST,
  GET_NEXT_POSTS,
} from "../const/ActionType";

export const getPosts = (startIndex = 0) => async (dispatch) => {
  startIndex === 0 &&
    dispatch({
      type: LOAD_POSTS,
    });

  try {
    const res = await axios.get("/api/posts/all/?start=" + startIndex);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const getPostsByUserId = (userID, startIndex = 0) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      "/api/posts/user/" + userID + "/?startIndex=" + startIndex
    );
    dispatch({
      type: GET_POSTS_BY_USERID,
      payload: res.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const addPost = (formData) => async (dispatch) => {
  const opts = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.post("/api/posts", formData, opts);
    dispatch({
      type: ADD_POST,
    });
    dispatch({
      type: CLEAR_POSTS,
    });
  } catch (error) {
    alert(error.response.data.msg);
  }
};

export const removePost = (postID) => async (dispatch) => {
  const opts = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete("/api/posts/" + postID, opts);
    dispatch({
      type: REMOVE_POST,
      payload: postID,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POSTS,
  });
};

export const inc = () => (dispatch) => {
  dispatch({
    type: GET_NEXT_POSTS,
  });
};
