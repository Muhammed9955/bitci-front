import React from "react";
import { connect } from "react-redux";
import cs from "classnames";
import isUndef from "lodash/isUndefined";
import { getTranslate } from "react-localize-redux";
import { cx } from "react-emotion";
import numeral from "numeral";
import sortBy from "lodash/sortBy";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
// import BAT from "../../general/svg/BAT.js";
// import BCH from "../../general/svg/BCH.svg";
import BTC from "../../general/svg/BTC";
// import BTG from "../../general/svg/BTG.svg";
// import BTT from "../../general/svg/BTT.svg";
// import BITCI from "../../general/svg/BITCI.svg";
// import CHFT from "../../general/svg/CHFT.svg";
// import DASH from "../../general/svg/DASH.svg";
// import DGB from "../../general/svg/DGB.svg";
// import DOGE from "../../general/svg/DOGE.svg";

// const coins = [
//   {
//     icon: <BAT />,
//     name: "BAT-TRY",
//   },
//   {
//     icon: <BCH />,
//     name: "BCH-TRY",
//   },
//   {
//     icon: <BTC />,
//     name: "BTC-TRY",
//   },
//   {
//     icon: <BTG />,
//     name: "BTG-TRY",
//   },
//   {
//     icon: <BTT />,
//     name: "BTT-TRY",
//   },
//   {
//     icon: <BITCI />,
//     name: "BITCI-TRY",
//   },
//   {
//     icon: <BCH />,
//     name: "BCH-TRY",
//   },
//   {
//     icon: <CHFT />,
//     name: "CHFT-TRY",
//   },
//   {
//     icon: <DASH />,
//     name: "DASH-TRY",
//   },
//   {
//     icon: <DGB />,
//     name: "DGB-TRY",
//   },
//   {
//     icon: <DOGE />,
//     name: "DOGE-TRY",
//   },
// ];

import { selectPair, setPairFav } from "store/state/app/actions";
import {
  toggleFavorites,
  setCurrency,
  setVolumeMode,
} from "store/state/ui/pairs/actions";
import { getPairData } from "store/state/app/selectors";

import * as $ from "./index.style";
import theme from "../../../theme";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Btn from "../../general/Btn";
import { Button } from "@material-ui/core";
const btnStyleActive = {
  background: theme.colors.orange,
  padding: "5px",
  fontSize: ".7rem",
  color: "white",
  fontWeight: "bold",
  borderRadius: "5px",
};
const btnStyle = {
  padding: "5px",
  fontSize: ".7rem",
  fontWeight: "bold",
  background: "none",
};
const btnsArr = ["TRY", "BTCI", "CHFT"];
class PairsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: "",
      isSearchMode: false,
      activeBtn: {
        index: 0,
        value: "TRY",
      },
    };

    this._searchInput = null;
  }
  gray = theme.colors.gray;

  render() {
    const {
      pairs,
      currenciesForFilter,
      l,
      onlyFavorites,
      toggleOnlyFavorites,
      currencyFilter,
      setCurrencyFilter,
      isVolumeMode,
      setVolumeMode,
    } = this.props;

    const { isSearchMode, searchFilter } = this.state;

    const filteredPairs = this._filter(pairs);
    const pairsToShow = this._sort(filteredPairs);

    const searchIconStyle = searchFilter ? { opacity: 1 } : { opacity: 0.4 };

    const changeBtn = cs({ active: !isVolumeMode });
    const volumeBtn = cs({ active: isVolumeMode });
    const arrow = (
      <div className="d-flex flex-column">
        <ArrowDropUpIcon style={{ fontSize: "1rem", opacity: ".5" }} />
        <ArrowDropDownIcon
          style={{ fontSize: "1rem", opacity: ".5", marginTop: "-.7rem" }}
        />
      </div>
    );
    const listItems = (
      <ul className="box-list-items" style={{ background: "red" }}>
        {/* <li>
          <a
            className="icon icon-search"
            onClick={this._toggleSearchMode}
            style={searchIconStyle}
            tabIndex="0"
          />
        </li> */}
        <li
          className="dropdown default-dropdown-item"
          style={{ color: "black" }}
        >
          {/* <a
            // className={currencyFilter && "is-green"}
            // className="text-black"
            tabIndex="0"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "black" }}
          >
            <span>{currencyFilter || l("all")}</span>
            <span className="icon icon-triangle-down-gray" />
          </a> */}
          <div className="dropdown-menu" aria-labelledby="dropdown">
            {currencyFilter && (
              <a
                className="dropdown-item"
                onClick={() => setCurrencyFilter(null)}
                tabIndex="0"
                style={{ color: "black" }}
              >
                {l("all")}
              </a>
            )}
            {currenciesForFilter.map((currency) => (
              <a
                className="dropdown-item"
                key={currency}
                onClick={() => setCurrencyFilter(currency)}
                tabIndex="0"
                style={{ color: "black" }}
              >
                {currency}
              </a>
            ))}
            <a
              className="dropdown-item"
              onClick={() => setCurrencyFilter(null)}
              tabIndex="0"
            >
              {l("all")}
            </a>
          </div>
        </li>
        {/* <li className="multiple-links">
          <a
            className={changeBtn}
            onClick={() => setVolumeMode(false)}
            tabIndex="0"
          >
            {l("switcher.change")}
            <Btn text={l("switcher.change")} bg="red" />
          </a>
          <a
            // className={volumeBtn}
            onClick={() => setVolumeMode(true)}
            tabIndex="0"
          >
            {l("switcher.volume")}
            <Btn text={l("switcher.volume")} bg="red" />
          </a>
        </li> */}
      </ul>
    );

    return (
      <div
        className={cx("main-item-box", $.pairsList)}
        style={{ background: "white" }}
      >
        <div
          style={{
            display: "flex",
            background: "#FCFCFC",
            borderRadius: "5px",
            border: "1px solid lightgrey",
            color: "black",
          }}
          className="my-3 mx-2 p-1"
        >
          <SearchIcon
            style={{
              opacity: ".5",
              marginRight: ".5rem",
            }}
          />
          <input
            value={searchFilter}
            onChange={this._onSearchChange}
            onBlur={this._toggleSearchMode}
            onKeyPress={this._onSearchKeyPress}
            ref={(el) => (this._searchInput = el)}
            type="text"
            style={{ width: "100%", background: "#FCFCFC" }}
            placeholder="Koin ara???"
          />
        </div>
        <div
          className="d-flex flex-row align-items-center px-2 justify-content-between"
          style={{ marginTop: "-.6rem" }}
        >
          <div className="d-flex flex-row align-items-center mr-2">
            <StarIcon
              style={{ fontSize: "1rem", color: theme.colors.mainDarkGray }}
            />
            <div style={{ fontSize: ".8rem", marginLeft: "5px" }}>
              Favoriler
            </div>
          </div>
          {btnsArr.map((i, n) => (
            <button
              style={
                n === this.state.activeBtn.index ? btnStyleActive : btnStyle
              }
              onClick={() => {
                setCurrencyFilter(i);
                this.setState({
                  ...this.state,
                  activeBtn: {
                    index: n,
                    value: i,
                  },
                });
              }}
            >
              {i}
            </button>
          ))}
        </div>
        {/* <div> {listItems}</div> */}

        <div
          className={cx("default-table is-scrolled", $.table)}
          style={{ padding: "5px 0 0 0" }}
        >
          <table>
            <thead
              style={{
                background: theme.colors.mainGray,
                height: "1rem",
              }}
            >
              <tr>
                <td>
                  {/* <a className={$.favSwitcher} onClick={toggleOnlyFavorites}>
                    <i
                      className={
                        "icon icon-heart-" + (onlyFavorites ? "green" : "gray")
                      }
                    />
                  </a> */}
                </td>
                <td
                  style={{ color: "#9B9B9B", fontSize: ".6rem" }}
                  className="p-2 text-right"
                >
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.pair")} */}
                    ????lem ??ifti
                    {arrow}
                  </div>
                </td>
                <td
                  style={{
                    color: "#9B9B9B",
                    display: "flex",
                    // fontSize: ".6rem",
                  }}
                  className="text-right p-2"
                >
                  <div className="d-flex flex-row align-items-center ">
                    {/* {l("columns.volume")} */}
                    Hacim
                    {arrow}
                    <div className="mr-1 ">
                      {/* {l("columns.price")} */}
                      Fiyat
                    </div>
                    {arrow}
                  </div>
                </td>
                {/* <td style={{ color: "black" }} className="text-right">
                  {isVolumeMode ? l("columns.volume") : l("columns.change")}
                  {l("columns.volume")}
                </td> */}
                <td style={{ color: "#9B9B9B" }}>
                  <div className="d-flex flex-row align-items-center text-right mr-5">
                    {/* {l("columns.change")} */}
                    De??i??im
                    {arrow}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>{pairsToShow.map(this._renderRow)}</tbody>
          </table>
        </div>
      </div>
    );
  }

  _renderRow = ({ pair, current, changePercent, volume, favorite, format }) => {
    const { selectPair, selectedPair, isVolumeMode } = this.props;

    const rowClassName = cs($.row, {
      active: pair === selectedPair,
    });
    // const Koin = coins.filter((i) => i.name === pair);
    // console.log({ Koin });
    return (
      <tr
        key={pair}
        className={rowClassName}
        onClick={() => selectPair(pair)}
        style={{ width: "100%" }}
      >
        <td
          onClick={(event) => this._favoriteClick(event, pair, !favorite)}
          className={$.favToggler}
          style={{ color: "black" }}
        >
          {/* {favorite && <i className="icon icon-heart-gray" />} */}
        </td>
        <td
          style={{
            color: "black",
            display: "flex",
            alignItems: "center",
            minWidth: "100px",
          }}
        >
          <BTC width="20" height="20" />
          <div
            className="d-flex flex-column ml-2"
            style={{
              fontSize: ".6rem",
            }}
          >
            <div className="">{pair}</div>
            <div className="mt-1" style={{ color: this.gray }}>
              Coin Name
            </div>
          </div>
        </td>
        <td
          style={{ color: "black", paddingRight: "1rem" }}
          className="text-right"
        >
          <div className="d-flex flex-column bg-gray ">
            {isUndef(volume) ? <div>0</div> : <div> {volume.toFixed(2)}</div>}
            {isUndef(current) ? (
              <div>_</div>
            ) : (
              <div className=" mt-1" style={{ opacity: ".4" }}>
                {numeral(current).format(format)}
              </div>
            )}
          </div>
        </td>
        {/* {isVolumeMode && (
          <td style={{ color: "black" }} className="text-right">
            {isUndef(volume) ? 0 : volume.toFixed(2)}
          </td>
        )} */}

        <td
          style={{ color: "black", paddingRight: "4rem" }}
          className="text-right "
        >
          {isUndef(changePercent) ? "_" : changePercent.toFixed(2) + "%"}
        </td>
      </tr>
    );
  };

  _toggleSearchMode = () => {
    this.setState(
      ({ isSearchMode }) => ({
        isSearchMode: !isSearchMode,
      }),
      () => {
        if (this.state.isSearchMode && this._searchInput.setSelectionRange) {
          const val = this.state.searchFilter;
          this._searchInput.focus();
          this._searchInput.setSelectionRange(val.length, val.length);
        }
      }
    );
  };

  _onSearchChange = ({ target }) => {
    this.setState({
      searchFilter: target.value,
    });
  };

  _onSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      this._toggleSearchMode();
    }
  };

  _filter = (pairs) => {
    const { searchFilter } = this.state;
    const { onlyFavorites, currencyFilter } = this.props;
    let filtered = pairs;

    filtered = onlyFavorites
      ? filtered.filter((pair) => pair.favorite)
      : filtered;

    filtered = currencyFilter
      ? filtered.filter((pair) => pair.pair.split("-")[1] === currencyFilter)
      : filtered;

    filtered = searchFilter
      ? filtered.filter((pair) =>
          pair.pair.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : filtered;

    return filtered;
  };

  _sort(pairs) {
    const { isVolumeMode } = this.props;
    const mainField = isVolumeMode ? "volume" : "change";

    const { withoutMainField, withMainField } = pairs.reduce(
      (pairsMap, pair) => {
        if (isUndef(pair[mainField])) {
          pairsMap.withoutMainField = pairsMap.withoutMainField.concat(pair);
        } else {
          pairsMap.withMainField = pairsMap.withMainField.concat(pair);
        }

        return pairsMap;
      },
      { withoutMainField: [], withMainField: [] }
    );

    return [
      ...sortBy(withMainField, mainField).reverse(),
      ...sortBy(withoutMainField, "pair"),
    ];
  }

  _favoriteClick = (event, pairName, isAdd) => {
    const { addFavorite, delFavorite } = this.props;

    event.stopPropagation();

    isAdd ? addFavorite(pairName) : delFavorite(pairName);
  };
}

const mapStateToProps = ({ app, locale, ui }) => {
  const pairNames = Object.keys(app.pairs);
  const pairs = pairNames.map((pairName) => getPairData(app, pairName));
  const currenciesForFilter = Array.from(
    new Set(pairNames.map((pairName) => pairName.split("-")[1]))
  );
  console.log({ currenciesForFilter });
  const {
    favorites: onlyFavorites,
    currency: currencyFilter,
    volumeMode: isVolumeMode,
  } = ui.pairs;

  return {
    pairs,
    currenciesForFilter,
    onlyFavorites,
    currencyFilter,
    isVolumeMode,
    selectedPair: app.selectedPair,
    l: (key) => getTranslate(locale)("pairsPanel." + key),
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectPair: (pair) => dispatch(selectPair(pair)),
  addFavorite: (pair) => dispatch(setPairFav(pair, true)),
  delFavorite: (pair) => dispatch(setPairFav(pair, false)),
  toggleOnlyFavorites: () => dispatch(toggleFavorites()),
  setCurrencyFilter: (val) => dispatch(setCurrency(val)),
  setVolumeMode: (bool) => dispatch(setVolumeMode(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PairsList);
