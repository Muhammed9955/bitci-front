import React from "react";
import theme from "../../../theme";

const TopbarItem = ({ title, value }) => {
  const gray = theme.colors.gray;

  return (
    <div className=" d-flex flex-column mx-1 bg-white mx-3">
      <div className="" style={{ fontSize: ".5rem", color: gray }}>
        {title}
      </div>
      <div className="" style={{ fontSize: ".6rem" }}>
        {value}
      </div>
    </div>
  );
};

export default TopbarItem;
