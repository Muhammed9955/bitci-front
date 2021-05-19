import React from 'react'
import get from 'lodash/get'
import last from 'lodash/last'
import cs from 'classnames'
import numeral from 'numeral'

import SwitchTabs from 'components/atoms/SwitchTabs'
import {CollectorWrapper} from 'utils/collector'
import connect from 'utils/embeddedConnectors/tickers'
import Table from 'components/atoms/Table'
import TickersSVG from 'components/svg/Tickers'
import en from 'translations/en'
import theme from 'theme'

import * as $ from './index.style'


const MAX_PERCENT = 100
const VOL_DECIMALS_DEFAULT = 4
const VOL_DECIMALS_BY_CURR = {
  'USDT': 2
}

const defaultColumn = {
  className: $.cellTxt,
  headerClassName: $.headerTxt,
}

class TickersTable extends React.Component {
  state = {activeSecondCurrency: null}
  _wrappersByPair = {}

  componentWillUpdate() {
    const {activeSecondCurrency} = this.state
    const {secondCurrencies} = this.props

    if (!activeSecondCurrency && secondCurrencies.length > 0) this._switchTab(secondCurrencies[0])
  }

  render() {
    const {activeSecondCurrency} = this.state
    const {pairs, secondCurrencies, collectors, l} = this.props

    const tabs = secondCurrencies.map((curr) => ({code: curr, title: curr}))

    const columns = [{
      ...defaultColumn,
      id: 'pair',
      Header: l('headers.pair'),
      accessor: ({currencies}) => (
        <span style={{color: theme.colors.lightGray}}>
          <span className={$.pairCellTxt}>{currencies[0]}</span> / {currencies[1]}
        </span>
      ),
    }, {
      ...defaultColumn,
      id: 'price',
      Header: l('headers.price'),
      accessor: ({pair, format}) => this._cellRender(pair, ({close = 0}) => numeral(close).format(format), true),
    }, {
      ...defaultColumn,
      id: 'high',
      Header: l('headers.high'),
      accessor: ({pair, format}) => this._cellRender(pair, ({high = 0}) => numeral(high).format(format), true),
    }, {
      ...defaultColumn,
      id: 'low',
      Header: l('headers.low'),
      accessor: ({pair, format}) => this._cellRender(pair, ({low = 0}) => numeral(low).format(format), true),
    }, {
      ...defaultColumn,
      id: 'volume',
      Header: `${l('headers.volume')} (${activeSecondCurrency || ''})`,
      accessor: ({pair}) => this._cellRender(pair, ({volume = 0, close = 0}) => (
        (volume * close).toFixed(VOL_DECIMALS_BY_CURR[activeSecondCurrency] || VOL_DECIMALS_DEFAULT)
      ), true),
    }, {
      ...defaultColumn,
      id: 'change',
      Header: l('headers.change'),
      accessor: ({pair}) => this._cellRender(pair, ({close = 0, open = 0}) => {
        const changeAbsolute = close - open
        const changePercent = changeAbsolute === 0
          ? 0
          : open === 0
            ? MAX_PERCENT
            : (changeAbsolute / open) * MAX_PERCENT
        const isGreater = changeAbsolute > 0

        return (
          <div>
            <span className={cs($.arrow, {[$.down]: !isGreater, [$.up]: isGreater})}/>
            <span className={isGreater ? $.green : $.red}>
              {`${isGreater ? '+' : ''}${changePercent.toFixed(2)}%`}
            </span>
          </div>
        )
      }, true),
    }, {
      ...defaultColumn,
      id: 'chart',
      Header: l('headers.chart'),
      accessor: ({pair}) => this._cellRender(pair, (tickers) => {
        const {close, open} = last(tickers)
        const change = close - open

        return <TickersSVG tickers={tickers} color={change > 0 ? theme.colors.green : theme.colors.red}/>
      }),
    }]

    const tableProps = {
      columns,
      striped: true,
      data: pairs.filter(({currencies}) => currencies[1] === activeSecondCurrency),
    }

    return (
      <div className={$.tickersTable}>
        <div className={$.header}>
          <SwitchTabs tabs={tabs} noBorder onSwitch={this._switchTab} active={activeSecondCurrency}/>
        </div>
        <div className={$.tableContainer}>
          <Table {...tableProps}/>
        </div>
      </div>
    )
  }

  _cellRender = (pair, render, onlyLast) => {
    const {collectors} = this.props
    const collector = collectors[pair]

    if (collector) {
      return this._wrappersByPair[pair] || (
        // using `key` prop to update in right way
        this._wrappersByPair = <CollectorWrapper key={pair} collector={collector}
                                                 render={onlyLast ? (tickers) => render(last(tickers)) : render}/>
      )
    }

    return render(onlyLast ? {} : [{}])
  }

  _switchTab = (activeSecondCurrency) => this.setState({activeSecondCurrency})
}

const mapStateToProps = (pairs, collectors) => ({
  pairs,
  collectors,
  secondCurrencies: Array.from(new Set(pairs.map(({currencies}) => currencies[1]))),
  l: (key) => get(en, `tickersTable.${key}`, ''),
})

export default connect(mapStateToProps)(TickersTable)