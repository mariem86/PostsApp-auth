import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";

import {
  getPostsByUserId,
  getPosts,
  clearPost,
} from "../js/action/postAction";
import PostLoading from "../layout/PostLoading/PostLoading";
import PostCard from "./PostCard";

const ListPosts = ({ _id = null }) => {
  const disptach = useDispatch();

  const { startIndex, hasMore, posts, isLoading } = useSelector(
    (state) => state.postReducer
  );

  //If the components is in the Dashboard
  useEffect(() => {
    if (_id) {
      disptach(getPostsByUserId(_id, startIndex));
    }
  }, [_id, disptach, startIndex]);

  //If the components is in the Home
  useEffect(() => {
    if (hasMore && _id === null) {
      disptach(getPosts(startIndex));
    }
  }, [startIndex, disptach, hasMore, _id]);

  //Clear the posts
  useEffect(() => {
    return disptach(clearPost());
  }, [disptach]);

  if (isLoading) {
    return <PostLoading />;
  }

  return (
    <Col lg="12" md="12" xs="12" sm="12" className="p-3">
      {posts.map((post, i) =>
        i + 1 === posts.length ? (
          <PostCard lastPost={true} key={i} post={post} />
        ) : (
          <PostCard key={i} post={post} />
        )
      )}
      {hasMore && <PostLoading />}
    </Col>
  );
};

export default ListPosts;
