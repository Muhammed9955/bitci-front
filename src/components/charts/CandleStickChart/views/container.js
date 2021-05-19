import React from 'react'
import {connect} from 'react-redux'
import {ChartCanvas} from 'react-stockcharts'
import {discontinuousTimeScaleProvider} from 'react-stockcharts/lib/scale'
import {fitWidth} from 'react-stockcharts/lib/helper'
import {CandlestickSeries, BarSeries} from 'react-stockcharts/lib/series'
import {format} from 'd3-format'
import {XAxis, YAxis} from 'react-stockcharts/lib/axes'
import {Chart} from 'react-stockcharts'
import {CrossHairCursor, MouseCoordinateY} from 'react-stockcharts/lib/coordinates'
import {OHLCTooltip} from 'react-stockcharts/lib/tooltip'
import max from 'lodash/max'

import {askChangeOrderPrice} from 'store/state/ui/orders/actions'
import {getSelectedPairData, getPriceDecimals} from 'store/state/app/selectors'
import {ORDERS_STATUSES_MAP} from 'utils/constants'

import Price from '../views/price'
import {GREEN_COLOR, GREEN_COLOR_A, RED_COLOR, RED_COLOR_A} from '../constants'


const VOLUME_DECIMALS = 2

class Container extends React.Component {
  state = {showMouseCoordinate: true}

  render() {
    const {
      children,
      height,
      calculatedData,
      candlesChartAdjust,
      otherChartAdjust,
      candlesChartChildren,
      otherChartChildren,
      onRef,
      orders,
      priceDecimals,
      changeOrderPrice,
      showOrders,
      ...extProps
    } = this.props
    const {width, ratio, type} = extProps

    const {showMouseCoordinate} = this.state

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData)

    const maxMinPrices = this._getMaxMinPrices()
    const maxPrice = max(maxMinPrices)
    const maxVolume = this._getMaxVolume()
    const candlesYExtents = candlesChartAdjust || maxMinPrices
    const marginRight = (priceDecimals + Math.ceil(maxPrice).toString().length) * 7 + 30
    const marginLeft = (VOLUME_DECIMALS + Math.ceil(maxVolume).toString().length) * 7 + 30

    const priceFormat = format(`.${priceDecimals}f`)

    return (
      <ChartCanvas ref={onRef}
                   height={height}
                   width={width}
                   ratio={ratio}
                   margin={{left: marginLeft, right: marginRight, top: 10, bottom: 20}}
                   type={type}
                   seriesName={'MSFT' + data.length}
                   data={data}
                   xScale={xScale}
                   xAccessor={xAccessor}
                   displayXAccessor={displayXAccessor}>

        <Chart id={1} height={height * 0.6}
               yExtents={[candlesYExtents]}
               padding={{top: 25, bottom: 0}}>
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} stroke='#192729'/>
          <YAxis axisAt="right" orient="right" tickFormat={priceFormat} ticks={5}
                 fill='rgba(255, 255, 255, 0.5)'
                 tickStroke='rgba(255, 255, 255, 0.5)' tickLabelFill='rgb(231, 231, 231)'
                 stroke='rgba(255, 255, 255, 0.5)'/>

          {showMouseCoordinate && (
            <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={priceFormat}/>
          )}

          <CandlestickSeries
            yAccessor={this._candleYAccessor(maxPrice)}
            fill={d => d.close > d.open ? GREEN_COLOR_A : RED_COLOR_A}
            stroke={d => d.close > d.open ? GREEN_COLOR : RED_COLOR}
            wickStroke={d => d.close > d.open ? GREEN_COLOR : RED_COLOR}/>

          <OHLCTooltip origin={[-40, 0]} textFill='#a3a9a9' ohlcFormat={format('.5f')}/>

          {showOrders && orders.map((order) => (
            <Price key={order.id} price={order.price} color={order.side === 'buy' ? GREEN_COLOR : RED_COLOR}
                   onChange={(newPrice) => changeOrderPrice(order, newPrice)} onUpdate={this._forceUpdate}
                   onHoverChange={this._toggleMouseCoordinate} format={priceFormat}/>
          ))}

          {candlesChartChildren && React.Children.map(candlesChartChildren, (c, i) => React.cloneElement(c, {key: i}))}
        </Chart>
        <Chart id={2} height={height * 0.25}
               yExtents={otherChartAdjust || [d => [d.volume, 0]]}
               origin={(w, h) => [0, h / 1.37]}>
          <YAxis axisAt="left" orient="left" ticks={4} tickFormat={format(`.${VOLUME_DECIMALS}f`)}
                 tickStroke='rgba(255, 255, 255, 0.5)' tickLabelFill='rgb(231, 231, 231)'
                 stroke='rgba(255, 255, 255, 0.5)' fill='rgba(255, 255, 255, 0.5)'/>

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format('.4f')}/>

          {otherChartChildren
            ? React.Children.map(otherChartChildren, (c, i) => React.cloneElement(c, {key: i}))
            : <BarSeries yAccessor={(d) => d.volume} fill={d => d.close > d.open ? GREEN_COLOR_A : GREEN_COLOR_A}/>
          }
        </Chart>

        <CrossHairCursor/>

        {children}

      </ChartCanvas>
    )
  }

  _forceUpdate = () => this.forceUpdate()

  _toggleMouseCoordinate = (state) => this.setState({showMouseCoordinate: !state})

  _getMaxMinPricesFromOrders = () => {
    const {orders = []} = this.props

    return orders.reduce((prices, order) => {
      const price = Number(order.price)

      if (price > prices[0]) prices[0] = price
      if (price < prices[1]) prices[1] = price

      return prices
    }, [-Infinity, +Infinity])
  }

  _getMaxMinPricesFromHistory = () => {
    const {calculatedData} = this.props

    return calculatedData.reduce((prices, {high, low}) => {
      if (typeof high === 'undefined' || typeof low === 'undefined') return prices

      if (high > prices[0]) prices[0] = high
      if (low < prices[1]) prices[1] = low

      return prices
    }, [-Infinity, +Infinity])
  }

  _getMaxMinPrices = () => {
    if (!this.props.showOrders) return this._getMaxMinPricesFromHistory()

    const [historyHigh, historyLow] = this._getMaxMinPricesFromHistory()
    const [orderHigh, orderLow] = this._getMaxMinPricesFromOrders()

    const preMin = Math.min(historyLow, orderLow)
    const preMax = Math.max(historyHigh, orderHigh)

    const min = preMin === Infinity ? 0 : preMin
    const max = preMax === -Infinity ? min : preMax

    return [max, min]
  }

  _getMaxVolume = () => {
    const {calculatedData} = this.props

    return max(calculatedData.map(({volume}) => volume)) || 0
  }

  _candleYAccessor = (maxPrice) => (d) => {
    const delimiter = 7000
    if (d.high === d.low) {
      const high = d.high + maxPrice / delimiter
      const low = d.low - maxPrice / delimiter

      return {high, low, open: high, close: low}
    }
    if (d.open === d.close) {
      const open = d.open + maxPrice / delimiter
      const close = d.close - maxPrice / delimiter

      return {open, close, high: open, low: close}
    }

    return {open: d.open, high: d.high, low: d.low, close: d.close}
  }

}

Container.defaultProps = {
  type: 'hybrid',
}

const mapStateToProps = (({app}) => ({
  priceDecimals: getPriceDecimals(app),
  orders: app.orders.filter(({status}) => (
    [ORDERS_STATUSES_MAP.SUBMITTED, ORDERS_STATUSES_MAP.READY_PROCESS].includes(status)
  )),
}))

const mapDispatchToProps = (dispatch) => ({
  changeOrderPrice: (order, newPrice) => dispatch(askChangeOrderPrice(order, newPrice)),
})

export default fitWidth(
  connect(mapStateToProps, mapDispatchToProps)(Container),
)