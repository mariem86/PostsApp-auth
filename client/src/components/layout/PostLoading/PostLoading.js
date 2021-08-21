import React from "react";
import Skeleton from "../Skeleton/Skeleton";

const PostLoading = () => {
  return (
    <div className="post-card">
      <div className="post-header">
        <Skeleton
          style={{ borderRadius: "100%", height: "50px", width: "50px" }}
        />
        <div>
          <Skeleton
            style={{
              width: "200px",
              height: "10px",
              margin: "5px 10px",
              borderRadius: "6px",
            }}
          />
          <Skeleton
            style={{
              width: "200px",
              height: "10px",
              margin: "5px 10px",
              borderRadius: "6px",
            }}
          />
        </div>
      </div>
      <div className="post-body">
        {" "}
        <Skeleton
          style={{
            width: "80%",
            height: "10px",
            margin: "5px auto",
            borderRadius: "6px",
          }}
        />{" "}
        <Skeleton
          style={{
            width: "80%",
            height: "10px",
            margin: "5px auto",
            borderRadius: "6px",
          }}
        />
      </div>
    </div>
  );
};

export default PostLoading;
