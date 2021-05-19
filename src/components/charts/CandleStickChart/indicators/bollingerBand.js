import React from 'react'
import {BarSeries, BollingerSeries, LineSeries} from 'react-stockcharts/lib/series'
import {BollingerBandTooltip} from 'react-stockcharts/lib/tooltip'
import {CurrentCoordinate} from 'react-stockcharts/lib/coordinates'

import {smaVolume50, ema12, ema26, bb, bbFill, bbStroke, GREEN_COLOR_A} from '../constants'
import Container from '../views/container'
import MovingAverageTip from './movingAverageTip'


class BollingerBand extends React.Component {
  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = bb(smaVolume50(ema12(ema26(history))))

    const candlesChartChildren = [
      <BollingerSeries yAccessor={bb.accessor()} stroke={bbStroke} fill={bbFill}/>,
      <BollingerBandTooltip origin={[-40, 20]} yAccessor={bb.accessor()} options={bb.options()} textFill='#a3a9a9'/>,
      <MovingAverageTip origin={[350, -8]} textFill='#a3a9a9' ema12={ema12} ema26={ema26}/>,
      <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>,
      <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>,
      <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()}/>,
      <CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()}/>,
    ]

    const otherChartChildren = [
      <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? GREEN_COLOR_A : GREEN_COLOR_A}/>,
      <LineSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()}/>,
      <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()}/>,
    ]

    return (
      <Container height={height}
                 showOrders={showOrders}
                 calculatedData={calculatedData}
                 candlesChartChildren={candlesChartChildren}
                 otherChartChildren={otherChartChildren}/>
    )
  }
}


export default BollingerBand