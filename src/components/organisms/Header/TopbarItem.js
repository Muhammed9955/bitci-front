import React from "react";
import theme from "../../../theme";

const TopbarItem = ({ title, value }) => {
  const gray = theme.colors.gray;

  return (
    <div className="d-flex flex-column mx-1 bg-white mx-2">
      <div
        className=""
        style={{
          fontSize: ".5rem",
          color: gray,
          // minWidth: "6rem",
          // background: "red",
        }}
      >
        {title}
      </div>
      <div className="" style={{ fontSize: ".6rem" }}>
        {value}
      </div>
    </div>
  );
};

export default TopbarItem;
