import React from 'react'
import last from 'lodash/last'
import cs from 'classnames'
import numeral from 'numeral'

import theme from 'theme'
import TickersSVG from 'components/svg/Tickers'

import * as $ from './index.style'


const {colors} = theme

const MAX_PERCENT = 100

const TickersChart = ({currencies, tickers, format}) => {
  const lastTicker = last(tickers)
  const {close = 0, open = 0} = lastTicker
  const changeAbsolute = close - open
  const changePercent = changeAbsolute === 0
    ? 0
    : open === 0
      ? MAX_PERCENT
      : (changeAbsolute / open) * MAX_PERCENT
  const isBigger = changePercent > 0

  return (
    <div className={$.tickersChart}>
      <div className={$.firstCurrency}>{currencies[0]}</div>
      <div className={$.price}>{numeral(close || 0).format(format)} {currencies[1]}</div>
      <div className={$.bottom}>
        <div className={$.change}>
          <span className={cs($.arrow, {[$.down]: changePercent < 0, [$.up]: isBigger})}/>
          <span className={cs($.percent, {[$.red]: changePercent < 0, [$.green]: isBigger})}>
            {isBigger && '+'}{changePercent.toFixed(2)} {'%'}
          </span>
        </div>
        <div className={$.svgContainer}>
          <TickersSVG tickers={tickers} color={isBigger ? colors.green : colors.red}/>
        </div>
      </div>
    </div>
  )
}

export default TickersChart