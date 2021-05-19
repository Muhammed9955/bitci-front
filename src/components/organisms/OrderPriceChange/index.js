import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import numeral from 'numeral'

import PriceInput from 'components/organisms/PriceInput'
import Button from 'components/atoms/Button'
import {ORDERS_SIDES} from 'utils/constants'
import {editOrder} from 'store/state/app/actions'
import {getSelectedPairData, getPriceFormat} from 'store/state/app/selectors'

import * as $ from './index.style'


class OrderPriceChange extends React.Component {
  constructor(props) {
    super(props)

    const {newPrice = 0} = props

    this.state = {
      price: newPrice
    }
  }

  render() {
    const {price} = this.state
    const {order, minPrice, priceFormat, l} = this.props

    const green = order.side === ORDERS_SIDES.BUY
    const red = order.side === ORDERS_SIDES.SELL

    const inputProps = {
      price,
      green,
      red,
      onChange: this._onPriceChange,
    }

    const submitBtnProps = {
      green,
      red,
      disabled: price < minPrice,
      onClick: this._onSubmit,
    }

    return (
      <div className={$.orderPriceChange}>
        <PriceInput {...inputProps}/>
        <span className={$.minPriceTip}>{l('minPriceTip', {price: priceFormat(minPrice)})}</span>
        <Button {...submitBtnProps}>{l('changePrice')}</Button>
        <Button lightCyan outline onClick={this._onCancel}>{l('cancel')}</Button>
      </div>
    )
  }

  _onPriceChange = (price) => this.setState({price})

  _onSubmit = () => {
    const {price} = this.state
    const {changePrice, onSubmit} = this.props

    const newPrice = Number(price)

    changePrice(newPrice)

    onSubmit && onSubmit(newPrice)
  }

  _onCancel = () => {
    const {price} = this.state
    const {onCancel} = this.props

    onCancel && onCancel(price)
  }
}

const mapStateToProps = ({locale, app}, {order}) => {
  const {minTotal} = getSelectedPairData(app)
  const {amount} = order

  return {
    l: (key, props) => getTranslate(locale)('orderForm.' + key, props),
    minPrice: Number(minTotal) / Number(amount),
    priceFormat: (price) => numeral(price).format(getPriceFormat(app)),
  }
}

const mapDispatchToProps = (dispatch, {order}) => ({
  changePrice: (price) => dispatch(editOrder({...order, price})),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPriceChange)