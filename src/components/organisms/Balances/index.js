import React from "react";
import { connect } from "react-redux";
import cs from "classnames";
import { getTranslate } from "react-localize-redux";
import { cx } from "react-emotion";
import { push } from "react-router-redux";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Modal from "components/atoms/Modal";
import DepositMenu from "components/organisms/DepositMenu";
import paths, { fillPath } from "utils/paths";

import * as $ from "./index.style";
import theme from "../../../theme";

const eRegex = /^.*e-([0-9]+)$/;
const formatBalance = (val) => {
  const match = String(val).match(eRegex);

  return match ? val.toFixed(match[1]) : val;
};

class Balances extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideZero: false,
      depositCurrency: null,
    };

    this._renderAsset = this._renderAsset.bind(this);
    this._toggleHideZero = this._toggleHideZero.bind(this);
  }

  render() {
    const { hideZero, depositCurrency } = this.state;
    const { assets, l } = this.props;
    const opacity = hideZero ? { opacity: 1 } : { opacity: 0.4 };

    return (
      <div
        className={cx("main-item-box", $.balances)}
        style={{ background: "white", color: "black", height: "40vh" }}
      >
        <header>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              {/* {l("title")} */}
              Bakiye
            </h3>
            <h3
              style={{
                color: theme.colors.gray,
                display: "flex",
                alignItems: "center",
              }}
            >
              Yatırma
              <ArrowForwardIosIcon
                style={{ fontSize: "1rem" }}
                className="ml-2"
              />
            </h3>
          </div>

          <ul className="box-list-items no-borders">
            {/* <li>
              <a
                className="icon icon-eye-disabled"
                style={opacity}
                onClick={this._toggleHideZero}
                tabIndex="0"
                style={{ color: "black" }}
              />
            </li> */}
            {/*<li className="bold-text">*/}
            {/*<span className="light mr-2">{l('total')}</span>*/}
            {/*<span className="color-green">USD<br/>10.4756</span>*/}
            {/*</li>*/}
            {/*<li className="bold-text">*/}
            {/*<span className="color-green">BTC<br/>O.05701</span>*/}
            {/*</li>*/}
          </ul>
        </header>
        <div className={cx("default-table is-scrolled", $.table)}>
          <table>
            <thead>
              <tr>
                <td style={{ color: "black" }}>
                  {/* {l("columns.asset")} {l("columns.balance")} */}
                </td>
                {/* <td style={{ color: "black" }}>{l("columns.balance")}</td> */}
                {/* <td style={{ color: "black" }}>{l("columns.actions")}</td> */}
              </tr>
            </thead>
            <tbody>{assets.map(this._renderAsset)}</tbody>
          </table>
        </div>
        {depositCurrency && (
          <Modal lg onClose={() => this._showDepositCurrency(null)}>
            <div className={$.depositContainer}>
              <DepositMenu currency={depositCurrency} />
            </div>
          </Modal>
        )}
      </div>
    );
  }

  _renderAsset(asset) {
    const { openWithdrawal } = this.props;
    const isZeroBalance = asset.Balance === 0;

    if (isZeroBalance && this.state.hideZero) return null;

    const iconPlus = cs("mr-3 icon", {
      "icon-plus-passive": isZeroBalance,
      "icon-plus-active": !isZeroBalance,
    });
    const iconMinus = cs("icon", {
      "icon-minus-passive": isZeroBalance,
      "icon-minus-active": !isZeroBalance,
    });

    return (
      <tr key={asset.CurrencyType}>
        <td className="larger" style={{ color: "black" }}>
          <div className="d-felx flex-column">
            <div
              className="d-felx flex-row mb-1"
              style={{ color: theme.colors.gray, fontSize: ".6rem" }}
            >
              <small className="mr-1">{asset.CurrencyName}</small>
              {`(${asset.CurrencyType})`}
            </div>
            <div style={{ fontSize: ".6rem" }} className="ml-2">
              {formatBalance(asset.Balance)}
            </div>
          </div>
        </td>
        {/* <td style={{ color: "black" }} className="larger">
          {formatBalance(asset.Balance)}
        </td> */}
        {/* <td style={{ color: "black" }}>
          <a
            className={iconPlus}
            tabIndex="0"
            onClick={() => this._showDepositCurrency(asset.CurrencyType)}
            style={{ color: "black" }}
          />
          <a
            className={iconMinus}
            tabIndex="0"
            onClick={() => openWithdrawal(asset.CurrencyType)}
            style={{ color: "black" }}
          />
        </td> */}
      </tr>
    );
  }

  _toggleHideZero() {
    this.setState({
      hideZero: !this.state.hideZero,
    });
  }

  _showDepositCurrency = (currency) =>
    this.setState(({ depositCurrency }) => ({ depositCurrency: currency }));
}

const mapStateToProps = ({ app, locale }) => ({
  assets: app.balances,
  l: (key) => getTranslate(locale)("balancesPanel." + key),
});

const mapDispatchToProps = (dispatch) => ({
  openWithdrawal: (currency) =>
    dispatch(
      push(fillPath(paths.WALLETS_SELECTED, { currency, type: "withdrawal" }))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
