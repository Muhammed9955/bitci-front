import React from "react";

const Btn = ({ bg, text }) => {
  return (
    <div
      style={{
        borderRadius: ".4rem",
        background: bg,
        color: "white",
        fontSize: "1rem",
        padding: ".5rem",
      }}
    >
      {text}
    </div>
  );
};

export default Btn;
