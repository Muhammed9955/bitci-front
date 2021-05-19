import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import SwitchTabs from 'components/atoms/SwitchTabs'
import OrderBook from 'components/organisms/OrderBook'
import OrderForm from 'components/organisms/OrderForm'
import Dropdown from 'components/atoms/Dropdown'
import DepthChart from 'components/charts/DepthChart'
import {ORDER_TYPES, ORDERS_SIDES} from 'utils/constants'
import {ORDER_BUY, ORDER_SELL} from 'store/state/ui/forms/constants'
import {setValue} from 'store/state/ui/forms/actions'
import {placeOrder} from 'store/state/app/actions'

import * as $ from './index.style'
import paths, {fillPath} from '../../../utils/paths'
import {push} from 'react-router-redux'


const TABS = {
  BUY: ORDERS_SIDES.BUY,
  SELL: ORDERS_SIDES.SELL,
  OPEN_ORDERS: 'openOrders',
}

class Trades extends React.Component {
  state = {
    orderSide: ORDERS_SIDES.BUY,
    orderType: ORDER_TYPES.MARKET,
  }

  render() {
    const {l} = this.props
    const {orderSide, orderType} = this.state
    const tabs = Object.values(TABS).map((tab) => ({title: l('tabs.' + tab), code: tab}))

    return (
      <div className={$.trades}>
        <SwitchTabs tabs={tabs} active={orderSide} onSwitch={this._onSwitch}/>
        <div className={$.content}>
          <div className={$.side}>
            <Dropdown value={l('orderTypes.' + orderType)} lightCyan>
              {Object.values(ORDER_TYPES).filter((t) => t !== orderType).map((t) => (
                <a key={t} onClick={() => this._setOrderType(t)}>{l('orderTypes.' + t)}</a>
              ))}
            </Dropdown>
            {this._renderOrderForm()}
            <DepthChart/>
          </div>
          <div className={$.side}>
            <OrderBook/>
          </div>
        </div>
      </div>
    )
  }

  _renderOrderForm = () => {
    const {l, forms, setValue, placeOrder} = this.props
    const {orderSide, orderType} = this.state
    const formName = orderSide === ORDERS_SIDES.SELL ? ORDER_SELL : ORDER_BUY
    const form = forms[formName]

    const orderFormProps = {
      type: orderType,
      green: orderSide === ORDERS_SIDES.BUY,
      red: orderSide === ORDERS_SIDES.SELL,
      submitTxt: l('btns.' + orderSide),
      size: form.size,
      limit: form.limit,
      stop: form.stop,
      onChange: (field, value) => setValue(formName, field, value),
      onSubmit: () => placeOrder(formName, orderType),
    }

    return (
      <OrderForm {...orderFormProps}/>
    )
  }

  _onSwitch = (activeTab) => {
    if (activeTab === TABS.OPEN_ORDERS) {
      const {onOpenOrdersClick} = this.props

      onOpenOrdersClick && onOpenOrdersClick()
    } else {
      this.setState({orderSide: activeTab})
    }
  }

  _setOrderType = (orderType) => (
    this.setState({orderType})
  )
}

const mapStateToProps = ({locale, ui}) => ({
  l: (key) => getTranslate(locale)('tradesPanel.' + key),
  forms: ui.forms,
})

const mapDispatchToProps = (dispatch) => ({
  setValue: (form, field, value) => dispatch(setValue(form, field, value)),
  placeOrder: (form, type) => dispatch(placeOrder(form, type)),
  onOpenOrdersClick: () => dispatch(push(paths.TRADES_ORDERS)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trades)