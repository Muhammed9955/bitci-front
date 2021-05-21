import React from "react";
import cs from "classnames";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";

import { ORDER_TYPES } from "utils/constants";

import Inner from "./views/inner";

class OrdersManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ORDER_TYPES.MARKET,
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
        style={{ height: "40vh", background: "black" }}
      >
        <header>
          <ul className="box-list-items">
            <li className="multiple-links more-padding">
              <a
                className={marketBtn}
                onClick={() => this._setType(ORDER_TYPES.MARKET)}
                tabIndex="0"
                style={{ color: "black" }}
              >
                {l("market")}
              </a>
              <a
                className={limitBtn}
                onClick={() => this._setType(ORDER_TYPES.LIMIT)}
                tabIndex="0"
                style={{ color: "black" }}
              >
                {l("limit")}
              </a>
              <a
                className={stopBtn}
                onClick={() => this._setType(ORDER_TYPES.STOP)}
                tabIndex="0"
                style={{ color: "black" }}
              >
                {l("stop")}
              </a>
            </li>
          </ul>
        </header>
        <Inner type={type} />
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
