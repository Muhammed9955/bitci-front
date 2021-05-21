import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Arrow = () => {
  return (
    <div className="d-flex flex-column">
      <ArrowDropUpIcon style={{ fontSize: "1rem", opacity: ".5" }} />
      <ArrowDropDownIcon
        style={{ fontSize: "1rem", opacity: ".5", marginTop: "-.7rem" }}
      />
    </div>
  );
};

export default Arrow;
