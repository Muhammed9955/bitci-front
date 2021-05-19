import React from 'react'
import {connect} from 'react-redux'
import cs from 'classnames'
import {getTranslate} from 'react-localize-redux'
import numeral from 'numeral'

import Paginator from 'components/atoms/Paginator'
import {padLeadZero} from 'utils/numbers'
import {ORDERS_STATUSES_MAP, ORDER_STATUS_CODES_MAP} from 'utils/constants'
import {exportArrayAsCSV} from 'store/state/app/actions'
import {getPriceFormat} from 'store/state/app/selectors'
import xlsIco from 'img/dashboard-icons/xls@2x.png'
import {formatDate} from 'utils/date'


class Table extends React.Component {
  render() {
    const {orders, l, exportOrders} = this.props
    const sortedOrders = orders.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)

    return (
      <div className="main-item-box full-width">
        <header>
          <div className="w-100">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <h3>{l('title')}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-12 d-flex justify-content-end">
                {/*<div className="d-flex">*/}
                {/*<div className="table-header-actions border-right border-dark">*/}
                {/*<span className="text-secondary">{l('dateRange')}:</span>*/}
                {/*<a tabIndex="0">*/}
                {/*<span className="text-white">yy/mm/dd</span>*/}
                {/*<span className="icon icon-triangle-down-gray"/>*/}
                {/*</a>*/}
                {/*<span className="text-secondary">&mdash;</span>*/}
                {/*<a tabIndex="0">*/}
                {/*<span className="text-white">yy/mm/dd</span>*/}
                {/*<span className="icon icon-triangle-down-gray"/>*/}
                {/*</a>*/}
                {/*</div>*/}
                {/*<div className="table-header-actions border-right border-dark">*/}
                {/*<span className="text-secondary">{l('pair')}:</span>*/}
                {/*<a tabIndex="0">*/}
                {/*<span className="text-white">{l('all')}</span>*/}
                {/*<span className="icon icon-triangle-down-gray"/>*/}
                {/*</a>*/}
                {/*</div>*/}
                {/*<div className="table-header-actions border-right border-dark">*/}
                {/*<span className="text-secondary">{l('side')}:</span>*/}
                {/*<a tabIndex="0">*/}
                {/*<span className="text-white">{l('all')}</span>*/}
                {/*<span className="icon icon-triangle-down-gray"/>*/}
                {/*</a>*/}
                {/*</div>*/}
                {/*<div className="table-header-actions">*/}
                {/*<button className="btn btn-info btn-sm" type="button" style={{paddingLeft: 26, paddingRight: 26}}>*/}
                {/*{l('btn.search')}*/}
                {/*</button>*/}
                {/*<button className="btn btn-outline-secondary btn-sm" type="button">*/}
                {/*{l('btn.reset')}*/}
                {/*</button>*/}
                {/*</div>*/}
                {/*<div className="table-header-actions">*/}
                {/*<a tabIndex="0">*/}
                {/*<span className="icon icon-eye-disabled" style={{verticalAlign: 'middle'}}/>*/}
                {/*<span className="text-secondary">{l('btn.hideCancelled')}</span>*/}
                {/*</a>*/}
                {/*</div>*/}
                {/*</div>*/}
                <div className="table-header-actions">
                  <a tabIndex="0" className="btn-link" onClick={() => exportOrders(sortedOrders)}>
                    <span className="text-secondary">{l('btn.exportHistory')}</span>
                    <img src={xlsIco} alt="" style={{marginTop: -15}}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Paginator className="default-table orders-history-table" data={sortedOrders} render={this._renderTable}/>
      </div>
    )
  }

  _renderTable = (orders) => {
    const {l} = this.props

    return (
      <table className="is-striped">
        <thead>
        <tr>
          <td>{l('columns.date')}</td>
          <td>{l('columns.pair')}</td>
          <td>{l('columns.type')}</td>
          <td>{l('columns.side')}</td>
          {/*<td>{l('columns.avg')}</td>*/}
          <td>{l('columns.price')}</td>
          <td>{l('columns.filled')}</td>
          <td>{l('columns.amount')}</td>
          <td>{l('columns.total')}</td>
          {/*<td>{l('columns.trigger')}</td>*/}
          <td>{l('columns.status')}</td>
          {/*<td>{l('columns.operation')}</td>*/}
        </tr>
        </thead>
        <tbody>
        {orders.map(this._renderRow)}
        </tbody>
      </table>
    )
  }

  _renderRow = (order) => {
    const {l, formatPriceByPair} = this.props

    const isCancelled = order.status === ORDERS_STATUSES_MAP.CANCELLED

    const sideClass = cs({'is-red': order.side === 'sell', 'is-green': order.side === 'buy'})
    const rowClass = cs({'disabled': isCancelled})

    return (
      <tr key={order.id} className={rowClass}>
        <td>{this._getFormattedDate(order.timestamp)}</td>
        <td>{order.pair}</td>
        <td>{l('type.' + order.type)}</td>
        <td className={sideClass}>{l('sides.' + order.side)}</td>
        {/*<td>{Number(0).toFixed(8)}</td>*/}
        <td>
          {typeof order.price === 'string' ? l('type.' + order.price) : formatPriceByPair(order.pair, order.price)}
        </td>
        <td>{order['filled_size']}</td>
        <td>{order.amount}</td>
        <td>{formatPriceByPair(order.pair, order.total)} {order.pair.split('-')[1]}</td>
        {/*<td>- -</td>*/}
        <td>{l('statuses.' + ORDER_STATUS_CODES_MAP[order.status])}</td>
        {/*<td>*/}
        {/*<button className="btn btn-outline-secondary btn-sm">{l('btn.detail')}</button>*/}
        {/*</td>*/}
      </tr>
    )
  }

  _getFormattedDate(timestamp) {
    const date = new Date(Number(timestamp))

    return formatDate(date)
  }
}


const mapStateToProps = ({app, locale}) => ({
  orders: app.ordersHistory,
  l: (key) => {
    const baseKey = key.startsWith('statuses.') ? 'orders.' : 'ordersHistoryPanel.'

    return getTranslate(locale)(baseKey + key)
  },
  formatPriceByPair: (pairName, price) => numeral(price).format(getPriceFormat(app, pairName)),
})

const mapDispatchToProps = (dispatch) => ({
  exportOrders: (orders) => dispatch(exportArrayAsCSV('orders-history.csv', orders)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
