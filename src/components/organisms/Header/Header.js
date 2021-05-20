import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import Logo from "./svg/Logo";
import IconContianer from "../../general/IconContianer";
import MenuMUI from "../../general/MUI/MenuMUI";
const Header = () => {
  const settings = ["Username", "settings", "Logout"];
  return (
    <div
      className="text-black  bg-white "
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="p-2">
        <Logo />
      </div>
      <div className="mt-3 d-flex flex-row align-items-center">
        <p className="pr-4">Borsa</p>
        <p className="pr-4">ürünler</p>
        <p className="pr-4">şirket</p>
        <p className="pr-4">Canlı Destek</p>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center ">
        <p className="pr-4 mt-3">Kasa</p>
        <p className="pr-4 mt-3">Cüzdanlarım</p>
        <p className="pr-4 mt-3">Referans Programı</p>
        <div className="d-flex flex-row align-items-center ">
          <div className="pl-2">
            <IconContianer
              icon={
                <PersonIcon style={{ color: "white", fontSize: "1.2rem" }} />
              }
              bg="#EA5607"
            />
          </div>
          <MenuMUI options={settings} />
        </div>
      </div>
    </div>
  );
};

export default Header;
