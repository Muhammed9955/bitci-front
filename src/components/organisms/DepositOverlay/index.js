import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {replace} from 'react-router-redux'

import DepositMenu from 'components/organisms/DepositMenu'
import Overlay from 'components/atoms/Overlay'
import Dropdown from 'components/atoms/Dropdown'
import paths, {fillPath} from 'utils/paths'

import * as $ from './index.style'


class DepositOverlay extends React.Component {
  render() {
    const {currency} = this.props

    return (
      <Overlay title={this._renderTitle()}>
        <div className={$.depositOverlay}>
          <DepositMenu currency={currency}/>
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
  onCurrencyChange: (currency) => dispatch(replace(fillPath(paths.FUNDS_DEPOSIT, {currency})))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DepositOverlay))