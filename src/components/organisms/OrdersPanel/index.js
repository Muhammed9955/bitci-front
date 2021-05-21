import React from "react";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";
import cs from "classnames";
import numeral from "numeral";

import { delOrder, openOrder } from "store/state/app/actions";
import { getPriceFormat } from "store/state/app/selectors";
import Tooltip from "components/atoms/Tooltip";
import { ORDERS_STATUSES_MAP, ORDER_STATUS_CODES_MAP } from "utils/constants";
import openedIco from "img/bulb-not-filled.svg";
import partiallyIco from "img/bulb-partially-filled.svg";
import filledIco from "img/bulb-filled.svg";

import * as $ from "./index.style";
import theme from "../../../theme";
import Arrow from "../../general/Arrow";

import dayjs from "dayjs";
const TYPES = {
  OPENED: "opened",
  FILLED: "filled",
};

class OrdersPanel extends React.Component {
  state = {
    type: TYPES.OPENED,
  };

  render() {
    const { selectedPair, orders, l } = this.props;
    console.log({ props: this.props });
    const { type } = this.state;
    const currency = selectedPair ? selectedPair.split("-")[1] : "";

    const ordersTBody =
      type === TYPES.OPENED
        ? orders.filter(this._openedOrderFilter).map(this._openedOrderRender)
        : orders.filter(this._filledOrderFilter).map(this._filledOrderRender);

    const content =
      ordersTBody.length === 0 ? (
        <div className={$.noOrdersTip}>
          {`There are no ${
            type === TYPES.OPENED ? "open" : "filled"
          } orders...`}
        </div>
      ) : (
        <div className={cs("default-table p-0 is-scrolled", $.table)}>
          <table className="is-striped">
            <thead style={{ background: theme.colors.mainGray }}>
              <tr>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.amount")} */}
                    Tarih
                    <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.price", { currency })} */}
                    Miktar <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.total", { currency })} */}
                    Alış Fiyatı
                    <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.status")} */}
                    Stop Limit <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.status")} */}
                    Toplam Alış Fiyatı
                    <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}>
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.status")} */}
                    Durum
                    <Arrow />
                  </div>
                </td>
                <td style={{ color: theme.colors.mainDarkGray }}></td>
              </tr>
            </thead>
            <tbody>{ordersTBody}</tbody>
          </table>
        </div>
      );

    return (
      <div
        className={cs("main-item-box", $.ordersPanel)}
        style={{ background: "white" }}
      >
        <header className={$.tabs}>
          <span
            className={cs($.tab, type === TYPES.OPENED && $.activeTab)}
            onClick={() => this._setType(TYPES.OPENED)}
            style={{ color: "black" }}
          >
            {l("openOrders")}
          </span>
          <span
            className={cs($.tab, type === TYPES.FILLED && $.activeTab)}
            onClick={() => this._setType(TYPES.FILLED)}
            style={{ color: "black" }}
          >
            {l("filledOrders")}
          </span>
        </header>
        {content}
      </div>
    );
  }

  _openedOrderRender = (order) => {
    const { deleteOrder, editOrder, format, l } = this.props;
    const { id, amount, price, status, timestamp } = order;

    return (
      <tr key={id}>
        <td style={{ color: "black" }}>
          {dayjs(timestamp).format("DD.MM.YYYY h:mm")}
        </td>
        <td style={{ color: "black" }}>{amount}</td>
        <td style={{ color: "black" }}>{format(price)}</td>
        <td style={{ color: "black" }}>Stop Limit </td>
        <td style={{ color: "black" }}>{format(price * amount)}</td>
        <td style={{ color: "black" }}> {status} </td>
        <td style={{ color: "red" }}> İptal </td>
        {/* <td className={$.actions}>
          <Tooltip title={l(`statuses.${ORDER_STATUS_CODES_MAP[status]}`)}>
            <img src={this._getIcoByStatus(status)} className={$.statusIco} />
          </Tooltip>
          <a
            className="icon icon-pen"
            onClick={() => editOrder(order)}
            tabIndex="0"
            style={{ color: "black" }}
          />
          <a
            className="icon icon-times"
            onClick={() => deleteOrder(id)}
            tabIndex="0"
            style={{ color: "black" }}
          />
        </td> */}
      </tr>
    );
  };

  _filledOrderRender = (order) => {
    const { format, l } = this.props;
    const { id, amount, price, status, timestamp } = order;

    return (
      <tr key={id}>
        <td style={{ color: "black" }}>
          {dayjs(timestamp).format("DD.MM.YYYY h:mm")}
        </td>
        <td style={{ color: "black" }}>{amount}</td>
        <td style={{ color: "black" }}>{format(price)}</td>
        <td style={{ color: "black" }}>Stop Limit </td>
        <td style={{ color: "black" }}>{format(price * amount)}</td>
        <td style={{ color: "black" }}> {status} </td>
        <td style={{ color: "red" }}> İptal </td>

        {/* <td className={$.actions}>
          <Tooltip title={l(`statuses.${ORDER_STATUS_CODES_MAP[status]}`)}>
            <img src={this._getIcoByStatus(status)} className={$.statusIco} />
          </Tooltip>
        </td> */}
      </tr>
    );
  };

  _getIcoByStatus = (status) => {
    if (status === ORDERS_STATUSES_MAP.FILLED) return filledIco;

    if (status === ORDERS_STATUSES_MAP.PARTIALLY_FILLED) return partiallyIco;

    return openedIco;
  };

  _openedOrderFilter = (order) => {
    return [
      ORDERS_STATUSES_MAP.SUBMITTED,
      ORDERS_STATUSES_MAP.READY_PROCESS,
      ORDERS_STATUSES_MAP.STOP_LIMIT_TRIGGER,
      ORDERS_STATUSES_MAP.PARTIALLY_FILLED,
    ].includes(order.status);
  };

  _filledOrderFilter = (order) => {
    return [ORDERS_STATUSES_MAP.FILLED].includes(order.status);
  };

  _setType = (type) => {
    this.setState({
      type,
    });
  };
}

const mapStateToProps = ({ app, locale }) => ({
  selectedPair: app.selectedPair,
  orders: app.orders,
  l: (key, params) => {
    const baseKey = key.startsWith("statuses.")
      ? "orders."
      : "ordersListPanel.";

    return getTranslate(locale)(baseKey + key, params);
  },
  format: (val) => numeral(val).format(getPriceFormat(app)),
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (id) => dispatch(delOrder(id)),
  editOrder: (order) => dispatch(openOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPanel);
