import React from 'react'
import cs from 'classnames'

import SwitchTabs from 'components/atoms/SwitchTabs'
import {CollectorWrapper} from 'utils/collector'
import TickersChart from 'components/charts/TickersChart'

import connect from 'utils/embeddedConnectors/tickers'

import * as $ from './index.style'


class TickersGrid extends React.Component {
  state = {activeSecondCurrency: null}

  componentWillUpdate() {
    const {activeSecondCurrency} = this.state
    const {secondCurrencies} = this.props

    if(!activeSecondCurrency && secondCurrencies.length > 0) this._switchTab(secondCurrencies[0])
  }

  render() {
    const {activeSecondCurrency} = this.state
    const {pairs, secondCurrencies} = this.props

    const {sm} = this.props

    const tickersClassName = cs($.tickersGrid, sm && $.sm)

    const tabs = secondCurrencies.map((curr) => ({code: curr, title: curr}))

    return (
      <div className={tickersClassName}>
        <div className={$.header}>
          <SwitchTabs tabs={tabs} noBorder onSwitch={this._switchTab} active={activeSecondCurrency}/>
        </div>
        <div className={$.charts}>
          {pairs
            .filter(({currencies}) => currencies[1] === activeSecondCurrency)
            .map(this._renderChart)
          }
        </div>
      </div>
    )
  }

  _renderChart = ({pair, currencies, format}) => {
    const {collectors} = this.props

    return (
      <div key={pair} className={$.chartContainer}>
        {collectors[pair]
          ? (
            <CollectorWrapper collector={collectors[pair]} render={(tickers) => (
              <TickersChart tickers={tickers} currencies={currencies} format={format}/>
            )}/>
          )
          : (
            <TickersChart currencies={currencies} format={format} tickers={[{}]}/>
          )}
      </div>
    )
  }
  _switchTab = (activeSecondCurrency) => this.setState({activeSecondCurrency})
}

const mapStateToProps = (pairs, collectors) => ({
  pairs,
  collectors,
  secondCurrencies: Array.from(new Set(pairs.map(({currencies}) => currencies[1]))),
})

export default connect(mapStateToProps)(TickersGrid)