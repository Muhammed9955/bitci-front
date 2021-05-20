import React from "react";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

import Page from "components/pages/Page";
import Ticker from "components/organisms/Ticker";
import OrderBook from "components/organisms/OrderBook";
import TradeHistory from "components/organisms/TradeHistory";
import PairsPanel from "components/organisms/PairsPanel";
import OrdersPanel from "components/organisms/OrdersPanel";
import Balances from "components/organisms/Balances";
import OrdersManager from "components/organisms/OrdersManager";
import Charts from "components/organisms/Charts";
import CrossOrder from "components/organisms/CrossOrder";
import Modal from "components/atoms/Modal";
import Button from "components/atoms/Button";

import * as $ from "./index.style";
import theme from "../../../theme";

const NAMES = {
  ORDER_BOOK: "orderBook",
  TRADE_HISTORY: "tradeHistory",
};

class ExchangePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extend: null,
      showCrossOrder: false,
    };
  }

  render() {
    const { l } = this.props;
    const { extend, showCrossOrder } = this.state;

    return (
      <Page>
        <div className="row h-100" >
          {/* left column */}
          <div className="col-md-3 col-xs-3 d-flex flex-column">
            <PairsPanel />

            {/* <OrdersPanel /> */}
            {/* <Balances /> */}
          </div>
          {/* middle column */}
          <div className="col-md-4 col-xs-4 d-flex flex-column">
            <Charts />
            <OrdersManager />
          </div>
          {/* right column */}
          <div className="col-md-3 col-xs-3 d-flex flex-column">
            {/* {!extend && <Ticker />} */}
            {(!extend || extend === NAMES.ORDER_BOOK) && (
              <OrderBook
                onMouseEnter={() => this._extend(NAMES.ORDER_BOOK)}
                onMouseLeave={() => this._extend(null)}
              />
            )}
            {(!extend || extend === NAMES.TRADE_HISTORY) && (
              <TradeHistory
                onMouseEnter={() => this._extend(NAMES.TRADE_HISTORY)}
                onMouseLeave={() => this._extend(null)}
              />
            )}
          </div>
          <div className="col-md-2 col-xs-2 d-flex flex-column   ">
            <div className="">dscsd</div>
            <div className="">dscsd</div>
          </div>
          {/* footer left    */}
          <div className="col-md-8 col-xs-8 d-flex flex-column  text-black">
            <div className="">dscsd</div>
            <div className="">dscsd</div>
          </div>
          {/* footer right    */}
          <div className="col-md-4 col-xs-4 d-flex flex-column text-black ">
            <div className="">dscsd</div>
            <div className="">dscsd</div>
          </div>{" "}
        </div>
        {showCrossOrder && (
          <Modal onClose={this._toggleShowCrossOrder}>
            <CrossOrder />
          </Modal>
        )}
      </Page>
    );
  }

  _extend(name) {
    this.setState({
      extend: name,
    });
  }

  _toggleShowCrossOrder = () => {
    this.setState(({ showCrossOrder }) => ({
      showCrossOrder: !showCrossOrder,
    }));
  };
}

const mapStateToProps = ({ app, locale }) => ({
  l: (key) => getTranslate(locale)("exchangePage." + key),
});

export default connect(mapStateToProps)(ExchangePage);
