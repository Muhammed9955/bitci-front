import React from "react";
import theme from "../../../theme";

const TopbarItem = ({ topText, dText }) => {
  const gray = theme.colors.gray;

  return (
    <div className=" d-flex flex-column mx-1 bg-white mx-3">
      <div className="" style={{ fontSize: ".7rem", color: gray }}>
        24s Hacim
      </div>
      <div className="" style={{ fontSize: ".9rem" }}>
        461.181,12
      </div>
    </div>
  );
};

export default TopbarItem;
