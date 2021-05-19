import React from 'react'
import cs from 'classnames'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import numeral from 'numeral'

import {connectData, DATA_TYPES} from 'utils/collector'
import {getPriceFormat} from 'store/state/app/selectors'
import currencies from 'utils/currencyIMGs'

import * as $ from './index.style'


const MAX_PERCENT = 100

const Ticker = ({current, high, low, volume, changeAbsolute, changePercent, selectedPair, l, format}) => {
  const isBigger = changeAbsolute > 0
  const changeColor = cs({
    'green': isBigger,
    'red': !isBigger,
  })
  const currentText = cs('info-text', changeColor)

  const currentArrow = cs('icon', {
    'icon-triangle-up': isBigger,
    'icon-triangle-down': !isBigger,
  })

  const [firstCurr, secondCurr] = selectedPair ? selectedPair.split('-') : ['', '']

  return (
    <div className="main-item-box p-4 full-width">
      <h4>
        <img src={currencies[firstCurr]} className={$.currencyIco}/>
        {[firstCurr, secondCurr].join(' / ')}
        <small>{l('24h')}</small>
      </h4>
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <span className={currentText}>
            {format(current)}
            <i className={currentArrow} style={{width: 14, height: 8}}/>
            {/*<b>USD 10.4756</b>*/}
          </span>
        </div>
        <div className="col-md-6 col-xs-6 text-right">
          <span className="info-text gray">
            <small>{l('high')}</small>
            {format(high)}
          </span>
          <span className="info-text gray">
            <small>{l('low')}</small>
            {format(low)}
          </span>
        </div>
        <div className="col-md-6 col-xs-6">
          <span className="info-text gray">
            {l('volume')} {volume.toFixed(3)} {firstCurr}
            {/*<small className="d-block">$32,000,000.31</small>*/}
          </span>
        </div>
        <div className="col-md-6 col-xs-6 text-right">
          <span className={currentText}>
            <small>{l('change')}</small>
            <span>{changeAbsolute > 0 && '+'}{format(changeAbsolute)}</span>
            <span className="d-block">{changePercent.toFixed(2)}%</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const mapDataToProps = ({current: data = {}}) => {
  const {c: current = 0, h: high = 0, l: low = 0, v: volume = 0, o: open = 0} = data
  const changeAbsolute = current - open
  const changePercent = changeAbsolute === 0
    ? 0
    : open === 0
      ? MAX_PERCENT
      : (changeAbsolute / open) * MAX_PERCENT

  return {
    current,
    high,
    low,
    volume,
    changeAbsolute,
    changePercent,
  }
}

const mapStateToProps = ({app, locale}) => ({
  selectedPair: app.selectedPair,
  l: (key) => getTranslate(locale)('tickerPanel.' + key),
  format: (val) => numeral(val).format(getPriceFormat(app)),
})

export default connect(mapStateToProps)(
  connectData(DATA_TYPES.COLL_CURRENT_TICKER_24, mapDataToProps)(Ticker),
)