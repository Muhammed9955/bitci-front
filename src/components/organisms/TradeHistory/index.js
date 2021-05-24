import React from "react";
import cs from "classnames";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";
import { cx } from "react-emotion";
import numeral from "numeral";

import { padLeadZero } from "utils/numbers";
import { connectData, DATA_TYPES } from "utils/collector";
import { setValue } from "store/state/ui/forms/actions";
import { ORDER_BUY, ORDER_SELL } from "store/state/ui/forms/constants";
import { getPriceFormat } from "store/state/app/selectors";

import * as $ from "./index.style";
import theme from "../../../theme";

const MAX_LINES = 5;
const BIGGER = 1;
const SMALLER = 2;

class TradeHistory extends React.Component {
  constructor(props) {
    super(props);

    this._maxLines = 0;
    this._container = null;
  }

  componentDidMount() {
    window.addEventListener("resize", this._onResize);

    this._megaForceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
  }

  componentWillUpdate() {
    this._maxLines = this._calcMaxLines();
  }

  render() {
    const { l, history } = this.props;

    return (
      <div
        className={cx("main-item-box full-width", $.tradeHistory)}
        style={{
          background: "white",
          color: "black",
          height: "30vh",
          padding: "0",
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <header>
          <h3 style={{ color: "black" }}>
            {/* {l("title")} */}
            Market Geçmişi
          </h3>
        </header>
        <div className={cx("default-table", $.table)} style={{ padding: "0" }}>
          <div
            className={$.header}
            style={{
              background: theme.colors.mainGray,
              padding: ".5rem",
            }}
          >
            <div className={$.head} style={{ fontSize: ".5rem" }}>
              {/* {l("columns.price")} */}
              Fiyat (TRY)
            </div>
            <div className={$.head} style={{ fontSize: ".5rem" }}>
              {/* {l("columns.size")} */}
              Miktar (BTC){" "}
            </div>
            <div className={$.head} style={{ fontSize: ".5rem" }}>
              {/* {l("columns.time")} */}
              Tarih{" "}
            </div>
          </div>
          <div className={$.lines} ref={(el) => (this._container = el)}>
            {history.slice(0, this._maxLines).map(this._renderLine)}
          </div>
        </div>
      </div>
    );
  }

  _renderLine = (line, index) => {
    const { onLineClick, format } = this.props;
    const isBigger = line.i === BIGGER;
    const color = cs({
      [$.red]: line.i === 2,
      [$.green]: line.i === 1,
    });
    const icon = cs($.arrow, {
      [$.up]: line.i === 1,
      [$.down]: line.i === 2,
    });

    return (
      <div
        key={index}
        className={$.line}
        onClick={() => onLineClick(line)}
        style={{ fontSize: ".5rem", padding: "0 5px " }}
      >
        <div className={cx($.column, color)}>
          <div
          // className={icon}
          />
          {format(line.p)}
        </div>
        <div className={$.column} style={{ color: "black" }}>
          {line.a}
        </div>
        <div className={cx($.column, $.gray)} style={{ color: "black" }}>
          {this._getDateFromTimestamp(line.t)}
        </div>
      </div>
    );
  };

  _getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // convert from seconds to milliseconds
    const h = padLeadZero(date.getHours());
    const m = padLeadZero(date.getMinutes());
    const s = padLeadZero(date.getSeconds());

    return `${h}:${m}:${s}`;
  };

  _calcMaxLines = () => {
    const { height } = this._container.getBoundingClientRect();

    return Math.floor(height / $.LINE_HEIGHT);
  };

  _onResize = () => {
    this._maxLines = this._calcMaxLines();

    this.forceUpdate();
  };

  _onMouseEnter = (event) => {
    const { onMouseEnter } = this.props;

    if (onMouseEnter) {
      this._megaForceUpdate();

      return onMouseEnter(event);
    }
  };

  _onMouseLeave = (event) => {
    const { onMouseLeave } = this.props;

    if (onMouseLeave) {
      this._megaForceUpdate();

      return onMouseLeave(event);
    }
  };

  _megaForceUpdate = () => {
    setTimeout(() => this.forceUpdate(), 0);
  };
}

const mapStateToProps = ({ app, locale }) => ({
  selectedPair: app.selectedPair,
  l: (key) => getTranslate(locale)("tradeHistoryPanel." + key),
  format: (val) => numeral(val).format(getPriceFormat(app)),
});

const mapDispatchToProps = (dispatch) => ({
  onLineClick: ({ p }) => {
    dispatch(setValue(ORDER_BUY, "limit", p));
    dispatch(setValue(ORDER_SELL, "limit", p));
  },
});

const mapDataToProps = (history) => ({ history });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectData(DATA_TYPES.COLL_TRADE_HISTORY, mapDataToProps)(TradeHistory));
