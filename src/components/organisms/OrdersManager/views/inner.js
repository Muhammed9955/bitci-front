import React from "react";
import { connect } from "react-redux";
import cs from "classnames";

import OrderForm from "components/organisms/OrderForm";
import { placeOrder } from "store/state/app/actions";
import { setValue } from "store/state/ui/forms/actions";
import { ORDER_BUY, ORDER_SELL } from "store/state/ui/forms/constants";
import { getSelectedPairCurrencies } from "store/state/app/selectors";

import * as $ from "./inner.style";

class Inner extends React.Component {
  constructor(props) {
    super(props);

    this._placeBuyOrder = this._placeOrder.bind(this, ORDER_BUY);
    this._placeSellOrder = this._placeOrder.bind(this, ORDER_SELL);

    this._setBuyField = this._set.bind(this, ORDER_BUY);
    this._setSellField = this._set.bind(this, ORDER_SELL);
  }

  render() {
    const innerClassName = cs(
      "row justify-content-between pt-2 pb-4 pl-5 pr-5 mr-0",
      $.inner
    );

    return (
      <div
        // className={innerClassName}
        style={{
          color: "black",
          padding: "0",
          height: "100%",
          width: "100%",
        }}
      >
        {this.props.activeBtn === 0 && this._renderBuySide()}
        {this.props.activeBtn === 1 && this._renderSellSide()}
      </div>
    );
  }

  _renderBuySide = () => {
    const { type, currency } = this.props;
    const { size = 0, limit = 0, stop = 0 } = this.props[ORDER_BUY];

    const sideClassName = cs("col-md-12 col-xs-12", $.side);

    return (
      <div className={sideClassName} >
        <OrderForm
          type={type}
          size={size}
          limit={limit}
          stop={stop}
          onSubmit={this._placeBuyOrder}
          onChange={this._setBuyField}
          green
          submitTxt={`BUY ${currency}`}
        />
      </div>
    );
  };

  _renderSellSide = () => {
    const { type, currency } = this.props;
    const { size = 0, limit = 0, stop = 0 } = this.props[ORDER_SELL];

    const sideClassName = cs("col-md-12 col-xs-12", $.side);

    return (
      <div className={sideClassName} style={{ color: "black" }}>
        <OrderForm
          type={type}
          size={size}
          limit={limit}
          stop={stop}
          onSubmit={this._placeSellOrder}
          onChange={this._setSellField}
          red
          submitTxt={`SELL ${currency}`}
        />
      </div>
    );
  };

  _set = (form, field, eventOrValue) => {
    let value = null;
    if (typeof eventOrValue.target !== "undefined")
      value = eventOrValue.target.value;
    else value = eventOrValue;

    const { setValue } = this.props;

    setValue(form, field, value);
  };

  _placeOrder = (form) => {
    const { type, placeOrder } = this.props;

    placeOrder(form, type);
  };
}

const mapStateToProps = ({ app, ui }) => ({
  currency: getSelectedPairCurrencies(app)[0],
  selectedPair: app.selectedPair,
  [ORDER_BUY]: ui.forms[ORDER_BUY],
  [ORDER_SELL]: ui.forms[ORDER_SELL],
});

const mapDispatchToProps = (dispatch) => ({
  placeOrder: (form, type) => {
    dispatch(placeOrder(form, type));
    dispatch(setValue(form, "size", 0));
  },
  setValue: (form, field, value) => dispatch(setValue(form, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
