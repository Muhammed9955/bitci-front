import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import Logo from "./svg/Logo";
import IconContianer from "../../general/IconContianer";
import MenuMUI from "../../general/MUI/MenuMUI";

const Header = () => {
  const settings = ["Çağlar Dursun", "settings", "Logout"];
  const borsa = ["borsa"];
  const products = ["ürünler"];

  return (
    <div
      className="text-black  bg-white "
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        fontSize: ".7rem",
      }}
    >
      <div className="d-flex flex-row align-items-center">
        <div style={{ marginRight: "48px" }}>
          <Logo />
        </div>
        <div className="mt-3 d-flex flex-row align-items-center">
          <div style={{ marginRight: "30px", paddingBottom: "1rem" }}>
            <MenuMUI options={borsa} />
          </div>
          <div style={{ marginRight: "30px", paddingBottom: "1rem" }}>
            <MenuMUI options={products} />
          </div>
          <p style={{ marginRight: "30px" }}>şirket</p>
          <p style={{ marginRight: "30px" }}>Canlı Destek</p>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center ">
        <p className="pr-4 mt-3">Kasa</p>
        <p className="pr-4 mt-3">Cüzdanlarım</p>
        <p className="pr-4 mt-3">Referans Programı</p>
        <div className="d-flex flex-row align-items-center ">
          <div className="pl-2">
            <IconContianer
              icon={
                <PersonIcon
                  style={{
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                />
              }
              bg="#EA5607"
            />
          </div>
          <div style={{ marginLeft: "8px" }}>
            <MenuMUI options={settings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
