import React from "react";
import cs from "classnames";
import get from "lodash/get";
import isUndef from "lodash/isUndefined";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import numeral from "numeral";

import NumberInput from "components/atoms/NumberInput";
import { Desktop, Mobile } from "components/layout";
import PriceInput from "components/organisms/PriceInput";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import { ORDER_TYPES as TYPES } from "utils/constants";
import { connectData, DATA_TYPES } from "utils/collector";
import { getSelectedPairData, getPriceFormat } from "store/state/app/selectors";

import * as $ from "./index.style";
import theme from "../../../theme";
import InputCard from "./InputCard";

const FEE = 0.0;

const calcSize = (balance, price, part, amountFormat) => {
  const partBalance = balance * part;

  if (partBalance === 0 && price === 0) return 0;

  const size = partBalance / price;

  const total = size * price;
  if (total + total * FEE > balance)
    return numeral((balance - balance * FEE) / price).format(
      amountFormat,
      Math.floor
    );

  return size;
};

const calcTotal = (size, price) => size * price;

const OrderForm = (props) => {
  const {
    format,
    formatAmount,
    minAmount,
    minTotal,
    firstCurrency,
    secondCurrency,
    maxBuyPrice,
    minSellPrice,
    balance,
    currPrice,
    l,
    ...externalProps
  } = props;

  const {
    type,
    green,
    red,
    onSubmit,
    submitTxt,
    size,
    limit,
    stop,
    onChange,
    increase,
    decrease,
    amountFormat,
    priceFormat,
  } = externalProps;

  const price = type === TYPES.MARKET ? currPrice : limit;
  const formattedPrice = Number(format(price));
  const formattedSize = Number(formatAmount(size));
  const total = calcTotal(formattedSize, formattedPrice);
  const formattedTotal = Number(format(total, Math.floor));

  const inputClass = cs("col-md-8 col-xs-8", {
    "is-green": green,
    "is-red": red,
  });

  const btnClass = cs("btn", {
    "btn-success": green,
    "btn-danger": red,
    "btn-info": !green && !red,
  });
  const btnColor = red ? "red" : theme.colors.green;

  const submitDisabled = formattedSize < minAmount || formattedTotal < minTotal;
  const btnBg = green ? theme.colors.green : "red";
  return (
    <div className={$.orderForm} style={{ color: "black" }} className="mt-2">
      {[TYPES.STOP].includes(type) && (
        <div
          className="dashboard-input"
          style={{
            color: theme.colors.mainDarkGray,
            border: "1px solid lightgray",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          <div
            className="row align-items-center justify-content-between"
            style={{
              width: "100%",
            }}
          >
            <span
              className="title col-md-4 col-xs-4"
              style={{ color: theme.colors.mainDarkGray, fontSize: ".5rem" }}
            >
              {/* {l("stop")} */}
              Stop
            </span>
            <NumberInput
              className={inputClass}
              format={priceFormat}
              value={stop}
              onChange={(value) => onChange("stop", value)}
              placeholder="Stop"
            />
            {/* <smallsty>{secondCurrency}</smallsty> */}
            <span style={{ paddingRight: "-10px", fontSize: ".7rem" }}>
              <small>{secondCurrency}</small>
              {/* <span className={cs("buttons", { green: green, red: red })}>
                <a
                  tabIndex="0"
                  onClick={() => onChange("stop", increase(stop))}
                >
                  <span className="icon icon-triangle-down-gray" />
                </a>
                <a
                  tabIndex="0"
                  onClick={() => onChange("stop", decrease(stop))}
                >
                  <span className="icon icon-triangle-down-gray" />
                </a>
              </span> */}
            </span>
          </div>
        </div>
      )}
      {[TYPES.STOP, TYPES.LIMIT].includes(type) && (
        <div
          className="dashboard-input"
          style={{
            color: theme.colors.mainDarkGray,
            border: "1px solid lightgray",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          <div
            className="row align-items-center"
            style={{ color: theme.colors.mainDarkGray, width: "100%" }}
          >
            <span
              className="title col-md-4 col-xs-4"
              style={{ color: theme.colors.mainDarkGray, fontSize: ".5rem" }}
            >
              {/* {l("limit")} */}
              fiayt
            </span>
            <NumberInput
              className={inputClass}
              value={limit}
              format={priceFormat}
              onChange={(value) => onChange("limit", value)}
            />
            <span
              // className="item-area"
              style={{ paddingRight: "-10px", fontSize: ".7rem" }}
            >
              <small>{secondCurrency}</small>
              {/* <span className={cs("buttons", { green: green, red: red })}>
                <a
                  tabIndex="0"
                  onClick={() => onChange("limit", increase(limit))}
                >
                  <span className="icon icon-triangle-down-gray" />
                </a>
                <a
                  tabIndex="0"
                  onClick={() => onChange("limit", decrease(limit))}
                >
                  <span className="icon icon-triangle-down-gray" />
                </a>
              </span> */}
            </span>
          </div>
        </div>
      )}
      <div
        className="dashboard-input"
        style={{
          color: theme.colors.mainDarkGray,
          border: "1px solid lightgray",
          borderRadius: "4px",
          padding: "5px",
        }}
      >
        <div
          className="row align-items-center "
          style={{ color: theme.colors.mainDarkGray, width: "100%" }}
        >
          <span
            className="title col-md-4 col-xs-4"
            style={{ color: theme.colors.mainDarkGray, fontSize: ".5rem" }}
          >
            {/* {l("amount")} */}
            Miktar
          </span>
          <NumberInput
            className={cs("is-active", inputClass)}
            format={amountFormat}
            value={size}
            onChange={(value) => onChange("size", value)}
          />
          <span
            // className="item-area"
            style={{ marginLeft: "-.5rem", fontSize: ".7rem" }}
          >
            <small className="mt-1">{firstCurrency}</small>
          </span>
        </div>
      </div>
      {/* <div className={$.minimalTip}>
        {l("minAmountTip", { amount: minAmount })}
      </div> */}

      <ul className="inner-list " style={{ marginRight: ".5px" }}>
        <li>
          <a
            onClick={() =>
              onChange(
                "size",
                calcSize(balance, formattedPrice, 0.25, amountFormat)
              )
            }
            tabIndex="0"
            style={{ color: "black", textDecoration: "none" }}
          >
            <div
              style={{
                background: theme.colors.green,
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                height: "1rem",
                width: "2rem",
              }}
            />
            25%
          </a>
        </li>
        <li>
          <a
            onClick={() =>
              onChange(
                "size",
                calcSize(balance, formattedPrice, 0.5, amountFormat)
              )
            }
            tabIndex="0"
            style={{ color: "black", textDecoration: "none" }}
          >
            <div
              style={{
                background: theme.colors.green,
                height: "1rem",
                width: "2rem",
              }}
            />
            50%
          </a>
        </li>
        <li>
          <a
            onClick={() =>
              onChange(
                "size",
                calcSize(balance, formattedPrice, 0.75, amountFormat)
              )
            }
            tabIndex="0"
            style={{ color: "black", textDecoration: "none" }}
          >
            <div
              style={{
                background: theme.colors.mainGray,
                height: "1rem",
                width: "2rem",
              }}
            />
            75%
          </a>
        </li>
        <li>
          <a
            onClick={() =>
              onChange(
                "size",
                calcSize(balance, formattedPrice, 1.0, amountFormat)
              )
            }
            tabIndex="0"
            style={{ color: "black", textDecoration: "none" }}
          >
            <div
              style={{
                background: theme.colors.mainGray,
                height: "1rem",
                width: "2rem",
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            />
            100%
          </a>
        </li>
      </ul>
      <div
        className="dashboard-input"
        style={{
          color: theme.colors.mainDarkGray,
          border: "1px solid lightgray",
          borderRadius: "4px",
          padding: "0 5px",
        }}
      >
        <div
          className="row align-items-center"
          style={{ color: theme.colors.mainDarkGray }}
        >
          <span
            // className=" col-md-4 col-xs-4"
            style={{
              color: theme.colors.mainDarkGray,
              fontSize: ".5rem",
              paddingLeft: "1rem",
            }}
          >
            {/* {l("total")} */}
            Toplam Fiyat
          </span>
          <input
            className={inputClass}
            type="text"
            readOnly
            value={formattedTotal}
            style={{
              color: "black",
              fontSize: ".6rem",
              padding: "0 2.5rem 0 1.5rem",
              height: "1.6rem",
            }}
          />
          <span
            // className="item-area"
            style={{ marginLeft: "-2rem", fontSize: ".7rem" }}
          >
            <small className="mt-1">{secondCurrency}</small>
          </span>
        </div>
      </div>
      {/* <div className={$.minimalTip}>
        {l("minTotalTip", { total: minTotal })}
      </div> */}
      <div
        //  className="dashboard-input"
        style={{ width: "100%" }}
      >
        <button
          // className={btnClass}
          onClick={onSubmit}
          disabled={submitDisabled}
          style={{
            height: "2rem",
            width: "100%",
            padding: "0",
            background: btnColor,
            color: "white",
          }}
        >
          {submitTxt}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (
  { app, locale },
  { firstCurrency: ownFirstCurrency, secondCurrency: ownSecondCurrency }
) => {
  const { selectedPair } = app;
  const [firstCurrency, secondCurrency] = selectedPair
    ? selectedPair.split("-")
    : ["", ""];
  const { tickSize, minTrade, minTotal, amountFormat } =
    getSelectedPairData(app);
  const format = getPriceFormat(app);

  return {
    amountFormat,
    minTotal,
    priceFormat: format,
    minAmount: minTrade,
    firstCurrency: isUndef(ownFirstCurrency) ? firstCurrency : ownFirstCurrency,
    secondCurrency: isUndef(ownSecondCurrency)
      ? secondCurrency
      : ownSecondCurrency,
    balance: get(
      app.balances.find(({ CurrencyType }) => CurrencyType === secondCurrency),
      "Balance",
      0
    ),
    l: (key, props) => getTranslate(locale)("orderForm." + key, props),
    increase: (val) => numeral(Number(val) + tickSize).format(format),
    decrease: (val) => {
      const newVal = Number(val) - tickSize;
      return numeral(newVal < 0 ? 0 : newVal).format(format);
    },
    format: (val, roundFunc) => numeral(val).format(format, roundFunc),
    formatAmount: (val) => numeral(val).format(amountFormat),
  };
};

const mapCurrPriceToProps = ({ current: currPrice = 0 }) => ({ currPrice });

const mapDepthBuyDataToProps = (depthBuy) => ({
  maxBuyPrice: (depthBuy[0] || { price: 0 }).price,
});

const mapDepthSellDataToProps = (depthSell) => ({
  minSellPrice: (depthSell[depthSell.length - 1] || { price: 0 }).price,
});

export default connect(mapStateToProps)(
  connectData(
    DATA_TYPES.COLL_CURRENT_PRICE,
    mapCurrPriceToProps
  )(
    connectData(
      DATA_TYPES.COLL_DEPTH_DATA_BUY,
      mapDepthBuyDataToProps
    )(
      connectData(
        DATA_TYPES.COLL_DEPTH_DATA_SELL,
        mapDepthSellDataToProps
      )(OrderForm)
    )
  )
);
