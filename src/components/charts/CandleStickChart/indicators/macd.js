import React from 'react'
import {MACDSeries, LineSeries} from 'react-stockcharts/lib/series'
import {MACDTooltip} from 'react-stockcharts/lib/tooltip'
import {CurrentCoordinate} from 'react-stockcharts/lib/coordinates'

import {ema12, ema26, macdAppearance, macdCalc} from '../constants'
import Container from '../views/container'
import MovingAverageTip from './movingAverageTip'


class MACD extends React.Component {
  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = macdCalc(ema12(ema26(history)))

    const candlesChartChildren = [
      <MACDTooltip origin={[-40, 20]} yAccessor={macdCalc.accessor()} options={macdCalc.options()}
                   appearance={macdAppearance}/>,
      <MovingAverageTip origin={[350, -8]} textFill='#a3a9a9' ema12={ema12} ema26={ema26}/>,
      <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>,
      <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>,
      <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()}/>,
      <CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()}/>,
    ]

    const otherChartChildren = [
      <MACDSeries yAccessor={macdCalc.accessor()} {...macdAppearance} />,
    ]

    return (
      <Container height={height}
                 showOrders={showOrders}
                 calculatedData={calculatedData}
                 candlesChartChildren={candlesChartChildren}
                 otherChartChildren={otherChartChildren}
                 otherChartAdjust={[macdCalc.accessor()]}/>
    )
  }
}


export default MACD