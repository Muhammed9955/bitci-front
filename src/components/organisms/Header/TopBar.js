import React from "react";
import BTC from "../../general/svg/BTC";
import Theme from "../../../theme/index";
import TopbarItem from "./TopbarItem";
import Menu from "../../general/MUI/MenuMUI";
import CustomizedSlider from "../../general/MUI/CustomizedSlider";
const Header = () => {
  const gray = Theme.colors.lightCyan;
  const lightGreen = Theme.colors.lightGreen;
  const months = ["1 Ay", "2 Ay", "3 Ay"];
  const pairs = ["BTC/TRY", "BAT/TRY", "BCH/TRY"];
  return (
    <div
      className="text-black  mt-2 mb-4 mx-3 "
      style={{
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="p-2 d-flex flex-row align-items-center bg-white  ">
        <BTC />
        <Menu options={pairs} />
        {/* <p className="align-items-center  mx-2 ">BTC/TRY</p> */}
      </div>
      <div className="p-2 d-flex flex-row bg-white align-items-center mx-1">
        <div className=" d-flex flex-column mx-1 bg-white">
          <div className="" style={{ fontSize: ".9rem" }}>
            461.181,12
          </div>
          <div className="" style={{ fontSize: ".8rem", color: gray }}>
            $55,112.81
          </div>
        </div>
        <div
          style={{
            borderRadius: "5px",
            background: lightGreen,
            color: "white",
            fontSize: ".8rem",
          }}
          className="p-1 ml-2"
        >
          %+2.15
        </div>
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
      </div>
      <div className="p-2 d-flex flex-row align-items-center bg-white mr-1 ">
        <CustomizedSlider />
        <Menu options={months} />
      </div>
      <div className="p-2 d-flex flex-row bg-white mr-1 ">
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
        <TopbarItem />
      </div>
    </div>
  );
};

export default Header;
