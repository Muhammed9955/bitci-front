import React from "react";
import cs from "classnames";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";
import { cx } from "react-emotion";
import numeral from "numeral";

import { connectData, DATA_TYPES } from "utils/collector";
import { SellDepthTable, BuyDepthTable } from "components/organisms/DepthTable";
import { Desktop, Mobile } from "components/layout";
import { setValue } from "store/state/ui/forms/actions";
import { ORDER_BUY, ORDER_SELL } from "store/state/ui/forms/constants";
import { getPriceFormat } from "store/state/app/selectors";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import * as $ from "./index.style";
import theme from "../../../theme";

class OrderBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
  }

  render() {
    const { currPrice, isGreater, selectedPair, l, format, changePercent } =
      this.props;
    const { isHovering } = this.state;

    const icon = cs("icon ml-2", {
      "icon-triangle-up": isGreater,
      "icon-triangle-down": !isGreater,
    });
    const incrementArea = cs($.incrementArea, {
      [$.incrementAreaGreen]: isGreater,
      [$.incrementAreaRed]: !isGreater,
    });
    const currencies = selectedPair ? selectedPair.split("-") : ["", ""];
    const p = changePercent && format(changePercent);
    console.log({ propsOrderBook: this.props });
    return (
      <div
        className={cx("main-item-box full-width", $.orderBook)}
        style={{
          background: "white",
          color: "black",
          height: "50vh",
          padding: "0",
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <Desktop component="header">
          <h3 style={{ color: "black" }}>
            {/* {l("title")} */}
            Emir Defteri
          </h3>
        </Desktop>
        <div
          className={cx("default-table", $.table)}
          style={{ width: "100%", padding: "0" }}
        >
          <div
            className={$.header}
            style={{
              background: theme.colors.mainGray,
              padding: ".5rem",
            }}
          >
            <div className={$.head} style={{ fontSize: ".5rem" }}>
              <div style={{ color: theme.colors.mainDarkGray }}>
                {/* {l("columns.price", { currency: currencies[1] })} */}
                Fiyat (TRY){" "}
              </div>
            </div>
            <div className={$.head} style={{ fontSize: ".5rem" }}>
              <div style={{ color: theme.colors.mainDarkGray }}>
                {/* {l("columns.amount")} <Mobile>({currencies[0]})</Mobile> */}
                Miktar (BTC)
              </div>
            </div>
            <Desktop
              component="div"
              className={$.head}
              style={{ fontSize: ".5rem" }}
            >
              <div style={{ color: theme.colors.mainDarkGray }}>
                {/* {l("columns.total")} */}
                Toplam
              </div>
            </Desktop>
          </div>
          <div className={$.depthTableContainer}>
            <BuyDepthTable
              green
              isHovering={isHovering}
              onLineClick={this._onBuyLineClick}
            />
          </div>
          <div
            className={incrementArea}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: theme.colors.mainGreen,
              fontSize: ".7rem",
            }}
          >
            <div className="" style={{ color: theme.colors.mainDarkGray }}>
              Son İşlem
            </div>
            <div className="" style={{ fontWeight: "bold" }}>
              {format(currPrice)}&nbsp;TRY
            </div>
            <div className="d-flex flex-row align-items-center">
              <ExpandLessIcon style={{ color: theme.colors.mainGreen }} />
              <div className="ml-1">{p} 2.15</div>
            </div>
          </div>
          <div className={$.depthTableContainer}>
            <SellDepthTable
              lower
              red
              isHovering={isHovering}
              onLineClick={this._onSellLineClick}
            />
          </div>
        </div>
      </div>
    );
  }

  _onMouseEnter = (event) => {
    const { onMouseEnter } = this.props;

    if (onMouseEnter) {
      this.setState({
        isHovering: true,
      });

      return onMouseEnter(event);
    }
  };

  _onMouseLeave = (event) => {
    const { onMouseLeave } = this.props;

    if (onMouseLeave) {
      this.setState({
        isHovering: false,
      });

      return onMouseLeave(event);
    }
  };

  _onSellLineClick = ({ price }) => {
    const { onSellPriceClick } = this.props;

    onSellPriceClick(price);
  };

  _onBuyLineClick = ({ price }) => {
    const { onBuyPriceClick } = this.props;

    onBuyPriceClick(price);
  };
}

const mapDataToProps = ({
  current: currPrice = 0,
  prev: prevCurrPrice = 0,
}) => {
  // const changeAbsolute = current - open;
  // const changePercent =
  //   changeAbsolute === 0 ? 0 : open === 0 ? 100 : (changeAbsolute / open) * 100;
  return {
    currPrice,
    isGreater: currPrice > prevCurrPrice,
  };
};

const mapStateToProps = ({ app, locale }) => ({
  selectedPair: app.selectedPair,
  l: (key, params) => getTranslate(locale)("orderBookPanel." + key, params),
  format: (val) => numeral(val).format(getPriceFormat(app)),
});

const mapDispatchToProps = (dispatch) => {
  const setPrices = (price) => {
    dispatch(setValue(ORDER_BUY, "limit", price));
    dispatch(setValue(ORDER_SELL, "limit", price));
  };

  return {
    onBuyPriceClick: setPrices,
    onSellPriceClick: setPrices,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectData(DATA_TYPES.COLL_CURRENT_PRICE, mapDataToProps)(OrderBook));
