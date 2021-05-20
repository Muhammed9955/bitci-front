import React from "react";
import cs from "classnames";
import { connect } from "react-redux";
import maxBy from "lodash/maxBy";
import get from "lodash/get";
import numeral from "numeral";

import { connectData, DATA_TYPES } from "utils/collector";
import { Desktop } from "components/layout";
import { getPriceFormat } from "store/state/app/selectors";

import * as $ from "./index.style";

class DepthTable extends React.Component {
  constructor(props) {
    super(props);

    this._container = null;

    this.state = {
      maxLines: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this._updateMaxLines);

    setTimeout(() => this.forceUpdate(), 0);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateMaxLines);
  }

  componentDidUpdate() {
    this._updateMaxLines();
  }

  render() {
    const { green, red, list, lower, onLineClick, format } = this.props;
    const { maxLines } = this.state;

    const cutList = lower
      ? list.slice(list.length < maxLines ? 0 : list.length - maxLines)
      : list.slice(0, maxLines);
    const maxSize = get(maxBy(cutList, "size"), "size", 0);

    const lineClass = cs($.line, {
      [$.lineRed]: red,
      [$.lineGreen]: green,
    });

    return (
      <div className={$.depthTable} ref={(el) => (this._container = el)}>
        {cutList.map((line) => (
          <div
            key={`${line.price}${line.size}`}
            className={lineClass}
            onClick={() => onLineClick(line)}
          >
            <div className={$.column} style={{ color: "black" }}>
              {format(line.price)}
            </div>
            <div className={$.column} style={{ color: "black" }}>
              {line.size}
            </div>
            <Desktop component="div" className={$.column}>
              {line.total.toFixed(5)}
            </Desktop>
            <div
              className={$.bar}
              style={{
                transform: `scaleX(${line.size / maxSize})`,
                transformOrigin: "left",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  _updateMaxLines = () => {
    const { height } = this._container.getBoundingClientRect();
    const { maxLines: currentMaxLines } = this.state;
    const maxLines = Math.floor(height / $.LINE_HEIGHT);

    if (currentMaxLines !== maxLines) {
      this.setState({
        maxLines,
      });
    }
  };
}

const mapStateToProps = ({ app }) => ({
  selectedPair: app.selectedPair,
  format: (val) => numeral(val).format(getPriceFormat(app)),
});

const ConnectedDepthTable = connect(mapStateToProps)(DepthTable);

const mapDataToProps = (list) => ({ list });

export const SellDepthTable = connectData(
  DATA_TYPES.COLL_DEPTH_DATA_SELL,
  mapDataToProps
)(ConnectedDepthTable);
export const BuyDepthTable = connectData(
  DATA_TYPES.COLL_DEPTH_DATA_BUY,
  mapDataToProps
)(ConnectedDepthTable);
