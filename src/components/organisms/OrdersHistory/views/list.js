import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import numeral from 'numeral'
import cs from 'classnames'

import {ORDERS_SIDES, ORDERS_STATUSES_MAP} from 'utils/constants'
import filledGreenIco from 'img/dashboard-icons/done-green.svg'
import filledRedIco from 'img/dashboard-icons/done-red.svg'
import {getPriceFormat} from 'store/state/app/selectors'

import * as $ from './list.style'
import {padLeadZero} from 'utils/numbers'


class List extends React.Component {
  render() {
    const {orders} = this.props

    return (
      <div className={$.list}>
        {orders.map(this._renderOrder)}
      </div>
    )
  }

  _renderOrder = ({id, side, pair, timestamp, price, amount, total, status}) => {
    const {l, format} = this.props

    const orderClassName = cs($.order, {
      [$.orderRed]: side === ORDERS_SIDES.SELL,
      [$.orderGreen]: side === ORDERS_SIDES.BUY,
    })

    const filledIco = [ORDERS_STATUSES_MAP.SUBMITTED, ORDERS_STATUSES_MAP.READY_PROCESS].includes(status)
      ? null
      : <img src={side === ORDERS_SIDES.BUY ? filledGreenIco : filledRedIco}/>

    return (
      <div key={id} className={orderClassName}>
        <div className={$.line}>
          <div>
            <span className={$.pair}>{pair}</span>
            <span className={$.side}>{l('sides.' + side)}</span>
          </div>
          <span className={$.date}>{this._getFormattedDate(timestamp)}</span>
        </div>
        <div className={$.line}>
          <div className={$.price}>
            {format(price)}
            <small>{l('price')}</small>
          </div>
          <div className={$.price}>
            {amount} {pair.split('-')[0]}
            <small>{l('amount')}</small>
          </div>
        </div>
        <div className={$.line}>
          <span className={$.filled}>
            {filledIco}
          </span>
          <div className={$.summary}>
            <span>
              {l('total')}:&nbsp;
              <span className={$.summaryPrice}>{format(total)}</span>&nbsp;
              {pair.split('-')[1]}
            </span>
          </div>
        </div>
      </div>
    )
  }

  _getFormattedDate(timestamp) {
    const date = new Date(Number(timestamp))
    const day = padLeadZero(date.getDate())
    const month = padLeadZero(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = padLeadZero(date.getHours())
    const minutes = padLeadZero(date.getMinutes())
    const seconds = padLeadZero(date.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}

const mapStateToProps = ({app, locale}) => ({
  orders: app.orders,
  l: (key) => getTranslate(locale)('tradesPanel.' + key),
  format: (price) => numeral(price).format(getPriceFormat(app)),
})

export default connect(mapStateToProps)(List)