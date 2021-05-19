import React from 'react'
import {SARSeries} from 'react-stockcharts/lib/series'
import {SingleValueTooltip} from 'react-stockcharts/lib/tooltip'

import {smaVolume50, ema12, ema26, dSar, sarLabel} from '../constants'
import Container from '../views/container'


class SAR extends React.Component {
  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = dSar(smaVolume50(ema12(ema26(history))))

    const candlesChartChildren = [
      <SARSeries yAccessor={dSar.accessor()}/>,
      <SingleValueTooltip origin={[-40, 20]} yLabel={sarLabel} yAccessor={dSar.accessor()} valueFill='#a3a9a9'/>,
    ]

    return (
      <Container height={height}
                 showOrders={showOrders}
                 calculatedData={calculatedData}
                 candlesChartChildren={candlesChartChildren}/>
    )
  }
}


export default SAR