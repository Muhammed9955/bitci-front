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
import { Grid } from "@material-ui/core";

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
      <div style={{ marginTop: "-1rem" }}>
        <Page>
          <div className="row h-100">
            {/* left column */}
            <Grid container>
              <Grid item sm={8} xs={12}>
                <div className="col-md-12 col-xs-12 d-flex flex-row vh-100 ">
                  <div className="col-md-4 col-xs-12 d-flex flex-column">
                    <PairsPanel />
                  </div>
                  <div className="col-md-8 col-xs-12 d-flex flex-column">
                    <Charts />
                  </div>
                </div>
                <div
                  className="col-md-12 col-xs-12 d-flex flex-column px-4"
                  style={{ height: "40vh" }}
                >
                  <OrdersPanel />
                </div>
              </Grid>
              {/* middle column  */}
              <Grid item sm={2} xs={12}>
                {/* {!extend && <Ticker />} */}
                <div style={{ height: "100vh" }}>
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
              </Grid>
              <Grid
                item
                sm={2}
                xs={12}
                style={{
                  height: "80vh",
                  paddingRight: "2rem",
                  paddingLeft: "1rem",
                }}
              >
                {/* right column */}
                <OrdersManager />
                <Balances />
              </Grid>
            </Grid>
          </div>
          <div className="col-md-4 col-xs-12">
            <OrdersManager />
          </div>
          {/* //! don't know wt is it for */}
          {showCrossOrder && (
            <Modal onClose={this._toggleShowCrossOrder}>
              <CrossOrder />
            </Modal>
          )}
        </Page>
      </div>
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
