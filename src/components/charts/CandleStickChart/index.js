import React from 'react'

import {connectData, DATA_TYPES} from 'utils/collector'

import Menu from './views/menu'
import {
  INDICATORS_LIST,
  IS,
} from './constants'
import MovingAverage from './indicators/movingAverage'
import Bar from './indicators/bar'
import BollingerBand from './indicators/bollingerBand'
import SAR from './indicators/sar'
import VolumeProfile from './indicators/volumeProfile'
import MACD from './indicators/macd'
import Fibonacci from './indicators/fibonacci'

class CandleStickChart extends React.Component {
  render() {
    const {
      history,
      height,
      indicator,
      showOrders,
    } = this.props

    if (history.length < 2) return null

    // FIXME: concat the fake element for good look of right candlestick
    const historyToPass = history.concat({date: new Date})

    switch (indicator) {
      case IS.MOV_AVG: return <MovingAverage history={historyToPass} height={height} showOrders={showOrders}/>
      case IS.BOL_BND: return <BollingerBand history={historyToPass} height={height} showOrders={showOrders}/>
      case IS.SAR: return <SAR history={historyToPass} height={height} showOrders={showOrders}/>
      case IS.VOL_PROF: return <VolumeProfile history={historyToPass} height={height} showOrders={showOrders}/>
      case IS.VOL_PROF_S: return <VolumeProfile history={historyToPass} height={height} session showOrders={showOrders}/>
      case IS.MACD: return <MACD history={historyToPass} height={height} showOrders={showOrders}/>
      case IS.FIBO: return <Fibonacci history={historyToPass} height={height} showOrders={showOrders}/>

      default: return <Bar history={historyToPass} height={height} showOrders={showOrders}/>
    }
  }
}

export default connectData(DATA_TYPES.COLL_TICKER_HISTORY, (history) => ({history}))(CandleStickChart)

export const IndicatorsMenu = ({indicator, onChange}) => (
  <Menu activeIndicator={indicator} onChange={onChange} indicators={INDICATORS_LIST}/>
)
