import React from 'react'
import {connect} from 'react-redux'
import cs from 'classnames'
import {getTranslate} from 'react-localize-redux'
import get from 'lodash/get'
import {matchPath} from 'react-router-dom'
import {replace, push} from 'react-router-redux'

import DepositMenu from 'components/organisms/DepositMenu'
import WithdrawalMenu from 'components/organisms/WithdrawalMenu'
import paths, {fillPath} from 'utils/paths'
import currencies from 'utils/currencyIMGs'

import * as $ from './index.style'
import Buttons from './views/buttons'
import {TYPES} from './types'


class DepositWithdrawals extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hideSmallAssets: false,
      filterText: ''
    }
  }

  render() {
    const {balances, l} = this.props
    const {hideSmallAssets, filterText} = this.state
    const smallAssetsStyle = {opacity: hideSmallAssets ? 1 : .4}

    return (
      <div className="main-item-box full-width">
        <header>
          <div className="row w-100 d-flex justify-content-between">
            <div className="col-xs-6 col-md-6">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <h3>{l('title')}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-12 d-flex">
                  <div className="table-header-actions border-right border-dark">
                    <div className="dashboard-input small" style={{marginBottom: 0}}>
                      <input type="text" value={filterText} onChange={this._onFilterTextChange}/>
                      <span className="item-area" style={{right: 0}}>
                        <i className="icon icon-search" style={{marginLeft: 5, marginTop: 2}}/>
                      </span>
                    </div>
                  </div>
                  <div className="table-header-actions">
                    <a tabIndex="0" style={smallAssetsStyle} onClick={this._toggleSmallAssets}>
                      <span className="icon icon-eye-disabled" style={{verticalAlign: 'middle'}}/>
                      <span className="text-secondary">{l('hideSmall')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="col-xs-6 col-md-6 table-header-info d-flex justify-content-center flex-column text-right">*/}
              {/*<div className="row">*/}
                {/*<div className="col-xs-12 col-md-12">*/}
                  {/*<span className="text-white">{l('status.estimated')}: </span>*/}
                  {/*<span className="text-success">0.034724790 BTC / $514.98</span>*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*<div className="text-secondary">*/}
                {/*<span style={{marginRight: 20}}>{l('status.withdrawalLimit')}: 2BTC</span>*/}
                {/*<span>{l('status.inUse')}: 0BTC</span>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
        </header>
        <div className="default-table deposit-withdrawals-table">
          <table className="is-striped">
            <colgroup>
              <col span="1" style={{width: 199}}/>
              <col span="1" style={{width: 189}}/>
              <col span="1" style={{width: 170}}/>
              <col span="1" style={{width: 157}}/>
              <col span="1" style={{width: 141}}/>
              {/*<col span="1" style={{width: 141}}/>*/}
              <col span="1" style={{width: 290}}/>
              <col span="1" style={{width: 42}}/>
            </colgroup>
            <thead>
            <tr>
              <td>{l('columns.coin')}</td>
              <td>{l('columns.name')}</td>
              <td>{l('columns.totalBalance')}</td>
              <td>{l('columns.availableBalance')}</td>
              <td>{l('columns.inOrder')}</td>
              {/*<td>{l('columns.currencyValue', {currency: 'BTC'})}</td>*/}
              <td/>
              <td>
                <div className="dropdown default-dropdown-item border-left border-dark" style={{padding: '0 8px'}}>
                  <a className="" tabIndex="0" role="button" data-toggle="dropdown" aria-haspopup="true"
                     aria-expanded="false">
                    <span className="icon icon-triangle-down-gray"/>
                  </a>
                </div>
              </td>
            </tr>
            </thead>
            <tbody>
            {this._renderRows(balances)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _renderRow = (asset) => {
    const {CurrencyType: currency, Balance: balance, CurrencyName: currencyName, InOrder: inOrder} = asset
    const {selected} = this.props
    const {hideSmallAssets} = this.state

    if (hideSmallAssets && balance <= 0) return null

    const isSelected = selected && selected.currency === currency
    const rowClass = cs({'active': isSelected})

    return (
      <tr key={currency} className={rowClass}>
        <td>
          <img src={currencies[currency]} className={$.currencyIco}/>
          {currency}
        </td>
        <td>{currencyName}</td>
        <td>{(balance + inOrder).toFixed(8)}</td>
        <td>{balance.toFixed(8)}</td>
        <td>{inOrder.toFixed(8)}</td>
        {/*<td>{Number(0).toFixed(8)}</td>*/}
        <td>
          <Buttons selectedType={isSelected && selected.type}
                   onClick={(type) => this._onSelectClick(currency, type)}/>
        </td>
        <td/>
      </tr>
    )
  }

  _renderMenu = (currency, type, key) => {
    const props = {currency}
    const containerStyle = {minHeight: 248}
    let menu = null

    if (type === TYPES.DEPOSIT) {
      menu = <DepositMenu {...props}/>
    } else if (type === TYPES.WITHDRAWAL) {
      menu = <WithdrawalMenu {...props}/>
    }

    return (
      <tr key={key} className="active">
        <td colSpan="8">
          <div className="d-flex flex-column justify-content-center" style={containerStyle}>
            {menu}
          </div>
        </td>
      </tr>
    )
  }

  _renderRows = (balances) => {
    const {selected} = this.props
    const {filterText} = this.state
    const filteredBalances = filterText
      ? balances.filter((asset) => (
        asset.CurrencyType.toLowerCase().includes(filterText)
        || asset.CurrencyName.toLowerCase().includes(filterText)
      ))
      : balances

    if (!selected) return filteredBalances.map(this._renderRow)

    return filteredBalances.reduce((rows, asset) => {
      const {CurrencyType: currency} = asset
      const renderedRow = this._renderRow(asset)

      if (selected.currency === currency) {
        return rows.concat([
          renderedRow,
          <tr key="just-tr"/>,
          this._renderMenu(selected.currency, selected.type, 'menu' + rows.length)
        ])
      }

      return rows.concat(renderedRow)
    }, [])
  }

  _onSelectClick = (currency, type) => {
    const {selected, select} = this.props

    if (selected && selected.currency === currency && selected.type === type) {
      return select()
    }

    return select(currency, type)
  }

  _onFilterTextChange = ({target}) => {
    this.setState({
      filterText: target.value.toLowerCase()
    })
  }

  _toggleSmallAssets = () => {
    this.setState(({hideSmallAssets}) => ({hideSmallAssets: !hideSmallAssets}))
  }
}

const mapStateToProps = ({app, locale, router}) => ({
  balances: app.balances,
  l: (key, params) => getTranslate(locale)('withdrawalsPanel.' + key, params),
  selected: get(matchPath(router.location.pathname, paths.WALLETS_SELECTED), 'params', null),
})

const mapDispatchToProps = (dispatch) => ({
  select: (currency, type) => {
    if(!currency || !type) return dispatch(replace(paths.WALLETS))

    const action = type === TYPES.HISTORY
      ? push(fillPath(paths.WALLETS_HISTORY, {currency}))
      : replace(fillPath(paths.WALLETS_SELECTED, {currency, type}))

    return dispatch(action)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithdrawals)