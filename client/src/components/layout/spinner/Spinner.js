import React from "react";
import { Spinner } from "reactstrap";

const Spin = () => {
  return (
    <div
      style={{
        margin: "3rem auto",
        textAlign: "center",
      }}
    >
      <Spinner color="dark" />
    </div>
  );
};

export default Spin;
