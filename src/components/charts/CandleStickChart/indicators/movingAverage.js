import React from 'react'
import {BarSeries, LineSeries} from 'react-stockcharts/lib/series'
import {CurrentCoordinate} from 'react-stockcharts/lib/coordinates'

import {smaVolume50, ema12, ema26, GREEN_COLOR_A} from '../constants'
import Container from '../views/container'
import MovingAverageTip from './movingAverageTip'


class MovingAverage extends React.Component {
  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = smaVolume50(ema12(ema26(history)))

    const candlesChartChildren = [
      <MovingAverageTip origin={[350, -8]} textFill='#a3a9a9' ema12={ema12} ema26={ema26}
                        smaVolume50={smaVolume50}/>,
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


export default MovingAverage