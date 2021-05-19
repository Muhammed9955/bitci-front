import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {replace} from 'react-router-redux'

import Dropdown from 'components/atoms/Dropdown'
import Overlay from 'components/atoms/Overlay'
import WithdrawalMenu from 'components/organisms/WithdrawalMenu'
import paths, {fillPath} from 'utils/paths'

import * as $ from './index.style'


class WithdrawalOverlay extends React.Component {
  render() {
    const {currency} = this.props

    return (
      <Overlay title={this._renderTitle()}>
        <div className={$.withdrawalOverlay}>
          <WithdrawalMenu currency={currency}/>
        </div>
      </Overlay>
    )
  }

  _renderTitle = () => {
    const {currencies, currency, onCurrencyChange} = this.props

    return <Dropdown value={currency} values={currencies} onChange={onCurrencyChange} white lg/>
  }
}

const mapStateToProps = ({app}, {match}) => ({
  currency: match.params.currency,
  currencies: app.balances.map(({CurrencyType}) => CurrencyType),
})

const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(replace(fillPath(paths.FUNDS_WITHDRAWAL, {currency}))),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithdrawalOverlay))