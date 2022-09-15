import React from "react";
import NotFoundImage from "../../assets/NotFound.png";

const NotFound = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        <img
          src={NotFoundImage}
          alt="Page Not Found"
          style={{ objectFit: "cover" }}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
};

export default NotFound;
