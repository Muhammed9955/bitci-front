import React, { useState } from "react";
import BTC from "../../general/svg/BTC";
import Theme from "../../../theme/index";
import TopbarItem from "./TopbarItem";
import Menu from "../../general/MUI/MenuMUI";
import CustomizedSlider from "../../general/MUI/CustomizedSlider";

import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";
import numeral from "numeral";

import { connectData, DATA_TYPES } from "utils/collector";
import { getPriceFormat } from "store/state/app/selectors";
import * as api from "api";

const MAX_PERCENT = 100;
const Header = (props) => {
  const {
    current,
    high,
    low,
    volume,
    changeAbsolute,
    changePercent,
    selectedPair,
    l,
    format,
  } = props;
  console.log({ props });
  const gray = Theme.colors.gray;
  const lightGreen = Theme.colors.lightGreen;
  const months = ["1 Ay", "2 Ay", "3 Ay"];
  const pairs = ["BTC/TRY", "BAT/TRY", "BCH/TRY"];
  const [profitAndLoss, setProfitAndLoss] = useState([]);

  api.getPairs().then((pairs) => {
    // console.log({ pairs });
    return pairs;
  });

  api.getProfitLoss().then((profitLossRes) => {
    // console.log({ profitLossRes });
    setProfitAndLoss(profitLossRes);
  });
  console.log({ profitAndLoss });
  const profitAndLossForPair = profitAndLoss.filter(
    (i) => i.Pair === selectedPair
  );
  console.log({ profitAndLossForPair });
  const totalamount =
    profitAndLossForPair.length > 0 && profitAndLossForPair[0].totalamount;
  const avgcost =
    profitAndLossForPair.length > 0 && profitAndLossForPair[0].avgcost;
  const totalcost =
    profitAndLossForPair.length > 0 && profitAndLossForPair[0].totalcost;
  const total = current * totalamount;
  const fark = total - totalcost;
  const farkP = (fark / totalcost).toFixed(2);

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
        <Menu options={pairs} btnStyle={{ fontSize: ".7rem" }} />
      </div>
      <div className="p-2 d-flex flex-row bg-white align-items-center mx-1">
        <div className=" d-flex flex-column mx-1 bg-white">
          <div className="" style={{ fontSize: ".6rem" }}>
            {current}
          </div>
          <div className="" style={{ fontSize: ".5rem", color: gray }}>
            $55,112.81
          </div>
        </div>
        <div
          style={{
            borderRadius: "5px",
            background: lightGreen,
            color: "white",
            fontSize: ".5rem",
          }}
          className="p-1 ml-2"
        >
          %{changePercent.toFixed(2)}
        </div>
        <TopbarItem title="24s Değişim" value={format(changeAbsolute)} />
        <TopbarItem title="24s En Yüksek" value={format(high)} />
        <TopbarItem title="24s En Düşük" value={format(low)} />
        <TopbarItem title="24s Hacim" value={volume.toFixed(3)} />
      </div>
      <div
        className="p-2 d-flex flex-row align-items-center bg-white mr-1"
        style={{ width: "15vw" }}
      >
        <CustomizedSlider />
        <div className="ml-1">
          <Menu
            options={months}
            btnStyle={{ fontSize: ".7rem", padding: "0" }}
          />
        </div>
      </div>
      <div className="p-2 d-flex flex-row bg-white mr-1 ">
        <TopbarItem value={totalamount} title="Adet" />
        <TopbarItem value={avgcost} title="Ort. Br. Maliyet" />
        <TopbarItem value={totalcost} title="Toplam Maliyet" />
        <TopbarItem value={total} title="Şimdiki Toplam Değeri" />
        <TopbarItem value={fark} title="Fark" />
        <TopbarItem value={farkP} title="Fark%" />
        <TopbarItem value={""} title="Global Değer" />
      </div>
    </div>
  );
};

const mapDataToProps = ({ current: data = {} }) => {
  const {
    c: current = 0,
    h: high = 0,
    l: low = 0,
    v: volume = 0,
    o: open = 0,
  } = data;
  const changeAbsolute = current - open;
  const changePercent =
    changeAbsolute === 0
      ? 0
      : open === 0
      ? MAX_PERCENT
      : (changeAbsolute / open) * MAX_PERCENT;

  return {
    current,
    high,
    low,
    volume,
    changeAbsolute,
    changePercent,
  };
};

const mapStateToProps = ({ app, locale }) => ({
  selectedPair: app.selectedPair,
  l: (key) => getTranslate(locale)("tickerPanel." + key),
  format: (val) => numeral(val).format(getPriceFormat(app)),
});

export default connect(mapStateToProps)(
  connectData(DATA_TYPES.COLL_CURRENT_TICKER_24, mapDataToProps)(Header)
);
