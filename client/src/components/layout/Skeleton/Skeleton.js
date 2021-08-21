import React from "react";
import skeletonModule from "./Skeleton.module.css";

function Skeleton(props) {
  const { style = {} } = props;
  return (
    <div className={skeletonModule["skeleton-container"]} style={style}>
      <div className={skeletonModule["skeleton-inner"]}></div>
    </div>
  );
}
export default Skeleton;
