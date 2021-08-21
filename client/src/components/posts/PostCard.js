import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePost, inc } from "../js/action/postAction";
import toDate from "../utils/toDate";
import toCamelCase from "../utils/toCamelCase";

import "./postCard.css";

const PostCard = ({ post: { text, user, date, _id }, lastPost = false }) => {
  const [show, setShow] = useState(false);
  const authUser = useSelector((state) => state.authReducer.user);
  const hasMore = useSelector((state) => state.postReducer.hasMore);
  const dispatch = useDispatch();

  const handleLast = (e) => {
    if (lastPost) {
      hasMore && dispatch(inc());
    }
  };

  return (
    <div
      className="post-card"
      onMouseEnter={handleLast}
      onMouseLeave={() => setShow(false)}
    >
      {authUser && authUser._id === user._id && (
        <i
          className="fas fa-ellipsis-h post-menu"
          onClick={() => setShow(!show)}
        ></i>
      )}{" "}
      {show && (
        <ul className="menu-container">
          <li
            onClick={() => {
              setShow(!show);
              dispatch(removePost(_id));
            }}
          >
            Remove <i className="fas fa-trash-alt"></i>{" "}
          </li>
        </ul>
      )}
      <div className="post-header">
        <h4
          className="avatar-post"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.name[0].toUpperCase()}{" "}
        </h4>{" "}
        <div>
          <p>{toCamelCase(user.name + " " + user.lastName)}</p>
          <p className="text-muted">{toDate(date)}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PostCard;
