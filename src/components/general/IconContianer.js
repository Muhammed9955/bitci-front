import React from "react";

const IconContianer = ({ bg, icon }) => {
  return (
    <div
      style={{
        background: bg,
        width: "2rem",
        height: "2rem",
        borderRadius: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </div>
  );
};

export default IconContianer;
