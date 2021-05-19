import React from 'react'
import cs from 'classnames'
import get from 'lodash/get'
import isUndef from 'lodash/isUndefined'
import {getTranslate} from 'react-localize-redux'
import {connect} from 'react-redux'
import numeral from 'numeral'

import NumberInput from 'components/atoms/NumberInput'
import {Desktop, Mobile} from 'components/layout'
import PriceInput from 'components/organisms/PriceInput'
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import {ORDER_TYPES as TYPES} from 'utils/constants'
import {connectData, DATA_TYPES} from 'utils/collector'
import {getSelectedPairData, getPriceFormat} from 'store/state/app/selectors'

import * as $ from './index.style'


const FEE = .000

const calcSize = (balance, price, part, amountFormat) => {
  const partBalance = balance * part

  if (partBalance === 0 && price === 0) return 0

  const size = partBalance / price

  const total = size * price
  if((total + total * FEE) > balance)
    return numeral((balance - balance * FEE) / price).format(amountFormat, Math.floor)

  return size
}

const calcTotal = (size, price) => (size * price)

const OrderForm = (props) => {
  const {
    format,
    formatAmount,
    minAmount,
    minTotal,
    firstCurrency,
    secondCurrency,
    maxBuyPrice,
    minSellPrice,
    balance,
    currPrice,
    l,
    ...externalProps,
  } = props

  const {
    type,
    green,
    red,
    onSubmit,
    submitTxt,
    size,
    limit,
    stop,
    onChange,
    increase,
    decrease,
    amountFormat,
    priceFormat,
  } = externalProps

  const price = type === TYPES.MARKET ? currPrice : limit
  const formattedPrice = Number(format(price))
  const formattedSize = Number(formatAmount(size))
  const total = calcTotal(formattedSize, formattedPrice)
  const formattedTotal = Number(format(total, Math.floor))

  const inputClass = cs('col-md-8 col-xs-8', {'is-green': green, 'is-red': red})
  const btnClass = cs('btn', {'btn-success': green, 'btn-danger': red, 'btn-info': !green && !red})
  const submitDisabled = formattedSize < minAmount || formattedTotal < minTotal

  return (
    <div className={$.orderForm}>
      <Desktop component='div'>
        {[TYPES.STOP, TYPES.LIMIT].includes(type) && (
          <ul className="inner-list">
            <li><a onClick={() => onChange('limit', maxBuyPrice)} tabIndex="0">{l('bid')}</a></li>
            <li><a onClick={() => onChange('limit', minSellPrice)} tabIndex="0">{l('ask')}</a></li>
          </ul>
        )}
        {[TYPES.STOP].includes(type) && (
          <div className="dashboard-input">
            <div className="row align-items-end">
              <span className="title col-md-4 col-xs-4">{l('stop')}</span>
              <NumberInput className={inputClass} format={priceFormat}
                     value={stop} onChange={(value) => onChange('stop', value)}/>
              <span className="item-area">
              <small>{secondCurrency}</small>
              <span className={cs('buttons', {'green': green, 'red': red})}>
                <a tabIndex="0" onClick={() => onChange('stop', increase(stop))}>
                  <span className="icon icon-triangle-down-gray"/>
                </a>
                <a tabIndex="0" onClick={() => onChange('stop', decrease(stop))}>
                  <span className="icon icon-triangle-down-gray"/>
                </a>
              </span>
            </span>
            </div>
          </div>
        )}
        {[TYPES.STOP, TYPES.LIMIT].includes(type) && (
          <div className="dashboard-input">
            <div className="row align-items-end"><span className="title col-md-4 col-xs-4">{l('limit')}</span>
              <NumberInput className={inputClass} value={limit} format={priceFormat}
                     onChange={(value) => onChange('limit', value)}/>
              <span className="item-area">
                <small>{secondCurrency}</small>
                <span className={cs('buttons', {'green': green, 'red': red})}>
                  <a tabIndex="0" onClick={() => onChange('limit', increase(limit))}>
                    <span className="icon icon-triangle-down-gray"/>
                  </a>
                  <a tabIndex="0" onClick={() => onChange('limit', decrease(limit))}>
                    <span className="icon icon-triangle-down-gray"/>
                  </a>
                </span>
              </span>
            </div>
          </div>
        )}
        <div className="dashboard-input">
          <div className="row align-items-end"><span className="title col-md-4 col-xs-4">{l('amount')}</span>
            <NumberInput className={cs('is-active', inputClass)} format={amountFormat}
                   value={size} onChange={(value) => onChange('size', value)}/>
            <span className="item-area"><small className="mt-1">{firstCurrency}</small></span>
          </div>
        </div>
        <div className={$.minimalTip}>{l('minAmountTip', {amount: minAmount})}</div>
        <ul className="inner-list">
          <li><a onClick={() => onChange('size', calcSize(balance, formattedPrice, .25, amountFormat))} tabIndex="0">25%</a></li>
          <li><a onClick={() => onChange('size', calcSize(balance, formattedPrice, .50, amountFormat))} tabIndex="0">50%</a></li>
          <li><a onClick={() => onChange('size', calcSize(balance, formattedPrice, .75, amountFormat))} tabIndex="0">75%</a></li>
          <li><a onClick={() => onChange('size', calcSize(balance, formattedPrice, 1.0, amountFormat))} tabIndex="0">100%</a></li>
        </ul>
        <div className="dashboard-input">
          <div className="row align-items-end"><span className="title col-md-4 col-xs-4">{l('total')}</span>
            <input className={inputClass} type="text" readOnly value={formattedTotal}/><span
              className="item-area"><small className="mt-1">{secondCurrency}</small></span>
          </div>
        </div>
        <div className={$.minimalTip}>{l('minTotalTip', {total: minTotal})}</div>
        <div className="dashboard-input" style={{marginTop: 10}}>
          <div className="row align-items-end">
          <span className="title col-md-4 col-xs-4">
            {/*{l('fee')}:*/}
            {/*<b className="d-block">5.65 BTC</b>*/}
          </span>
            <button className={btnClass} onClick={onSubmit} disabled={submitDisabled}>{submitTxt}</button>
          </div>
        </div>
      </Desktop>
      <Mobile component='div' className={$.inner}>
        {[TYPES.STOP].includes(type) && (
          <PriceInput price={stop} onChange={(value) => onChange('stop', value)} green={green} red={red}/>
        )}
        {[TYPES.STOP, TYPES.LIMIT].includes(type) && (
          <PriceInput price={limit} onChange={(value) => onChange('limit', value)} green={green} red={red}/>
        )}
        {/*<div className={$.equivalent}>{l('equivalent')} $3.45</div>*/}
        <PriceInput price={size} onChange={(value) => onChange('size', value)} green={green} red={red} format={amountFormat}/>
        <div className={$.sizes}>
          <span onClick={() => onChange('size', calcSize(balance, formattedPrice, .25, amountFormat))}>25%</span>
          <span onClick={() => onChange('size', calcSize(balance, formattedPrice, .50, amountFormat))}>50%</span>
          <span onClick={() => onChange('size', calcSize(balance, formattedPrice, .75, amountFormat))}>75%</span>
          <span onClick={() => onChange('size', calcSize(balance, formattedPrice, 1.0, amountFormat))}>100%</span>
        </div>
        <Input value={formattedTotal} readOnly green={green} red={red} textCenter/>
        <div className={$.available}>
          <span>{l('available')}</span>
          <span>{format(balance)} {secondCurrency}</span>
        </div>
        <Button onClick={onSubmit} disabled={submitDisabled} green={green} red={red}>
          {submitTxt}
        </Button>
      </Mobile>
    </div>
  )
}

const mapStateToProps = ({app, locale}, {firstCurrency: ownFirstCurrency, secondCurrency: ownSecondCurrency}) => {
  const {selectedPair} = app
  const [firstCurrency, secondCurrency] = selectedPair ? selectedPair.split('-') : ['', '']
  const {tickSize, minTrade, minTotal, amountFormat} = getSelectedPairData(app)
  const format = getPriceFormat(app)

  return {
    amountFormat,
    minTotal,
    priceFormat: format,
    minAmount: minTrade,
    firstCurrency: isUndef(ownFirstCurrency) ? firstCurrency : ownFirstCurrency,
    secondCurrency: isUndef(ownSecondCurrency) ? secondCurrency : ownSecondCurrency,
    balance: get(app.balances.find(({CurrencyType}) => CurrencyType === secondCurrency), 'Balance', 0),
    l: (key, props) => getTranslate(locale)('orderForm.' + key, props),
    increase: (val) => (numeral(Number(val) + tickSize).format(format)),
    decrease: (val) => {
      const newVal = Number(val) - tickSize
      return numeral(newVal < 0 ? 0 : newVal).format(format)
    },
    format: (val, roundFunc) => numeral(val).format(format, roundFunc),
    formatAmount: (val) => numeral(val).format(amountFormat),
  }
}

const mapCurrPriceToProps = ({current: currPrice = 0}) => ({currPrice})

const mapDepthBuyDataToProps = (depthBuy) => ({
  maxBuyPrice: (depthBuy[0] || {price: 0}).price,
})

const mapDepthSellDataToProps = (depthSell) => ({
  minSellPrice: (depthSell[depthSell.length - 1] || {price: 0}).price,
})

export default connect(mapStateToProps)(
  connectData(DATA_TYPES.COLL_CURRENT_PRICE, mapCurrPriceToProps)(
    connectData(DATA_TYPES.COLL_DEPTH_DATA_BUY, mapDepthBuyDataToProps)(
      connectData(DATA_TYPES.COLL_DEPTH_DATA_SELL, mapDepthSellDataToProps)(
        OrderForm,
      ),
    ),
  ),
)