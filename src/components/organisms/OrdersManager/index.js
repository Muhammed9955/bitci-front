import React from "react";
import cs from "classnames";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";

import { ORDER_TYPES } from "utils/constants";

import Inner from "./views/inner";
import theme from "../../../theme";

const btnStyle = {
  background: theme.colors.mainGray,
  color: theme.colors.mainDarkGray,
  fontWeight: "bold",
  fontSize: ".5rem",
};
const btnStyleBuy = {
  background: theme.colors.green,
  color: "white",
  fontWeight: "bold",
  fontSize: ".5rem",
};
const btnStyleSell = {
  background: "red",
  color: "white",
  fontWeight: "bold",
  fontSize: ".5rem",
};

class OrdersManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ORDER_TYPES.LIMIT,
      activeBtn: 0,
    };

    this._setType = this._setType.bind(this);
  }

  render() {
    const { l } = this.props;
    const { type } = this.state;

    const marketBtn = cs({ active: type === ORDER_TYPES.MARKET });
    const limitBtn = cs({ active: type === ORDER_TYPES.LIMIT });
    const stopBtn = cs({ active: type === ORDER_TYPES.STOP });

    return (
      <div
        className="main-item-box"
        // style={{ background: "white", color: "black" }}
        style={{ background: "white", paddingBottom: ".5rem" }}
      >
        <div className="d-flex flex-row">
          <button
            className="col-md-6 p-2"
            style={this.state.activeBtn === 0 ? btnStyleBuy : btnStyle}
            onClick={() =>
              this.setState({
                ...this.state,
                activeBtn: 0,
              })
            }
          >
            BTC Al
          </button>
          <button
            className="col-md-6 p-2"
            style={this.state.activeBtn === 1 ? btnStyleSell : btnStyle}
            onClick={() =>
              this.setState({
                ...this.state,
                activeBtn: 1,
              })
            }
          >
            BTC Sat
          </button>
        </div>
        <header>
          <ul className="box-list-items">
            <li className="multiple-links more-padding">
              <a
                className={limitBtn}
                onClick={() => this._setType(ORDER_TYPES.LIMIT)}
                tabIndex="0"
                style={{ color: "black", fontSize: ".5rem" }}
              >
                {l("limit")}
              </a>
              <a
                className={marketBtn}
                onClick={() => this._setType(ORDER_TYPES.MARKET)}
                tabIndex="0"
                style={{ color: "black", fontSize: ".5rem" }}
              >
                {l("market")}
              </a>
              <a
                className={stopBtn}
                onClick={() => this._setType(ORDER_TYPES.STOP)}
                tabIndex="0"
                style={{ color: "black", fontSize: ".5rem" }}
              >
                {l("stop")}
              </a>
            </li>
          </ul>
        </header>
        <Inner type={type} activeBtn={this.state.activeBtn} />
      </div>
    );
  }

  _setType(type) {
    this.setState({ type });
  }
}

const mapStateToProps = ({ locale }) => ({
  l: (key) => getTranslate(locale)("ordersManagerPanel." + key),
});

export default connect(mapStateToProps)(OrdersManager);
