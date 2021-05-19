import React from 'react'
import {VolumeProfileSeries} from 'react-stockcharts/lib/series'

import {smaVolume50, ema12, ema26} from '../constants'
import Container from '../views/container'


class VolumeProfile extends React.Component {
  render() {
    const {
      history,
      height,
      session,
      showOrders,
    } = this.props

    const calculatedData = smaVolume50(ema12(ema26(history)))

    const candlesChartChildren = [
      session
        ? <VolumeProfileSeries bySession orient="right" showSessionBackground/>
        : <VolumeProfileSeries/>,
    ]

    return (
      <Container height={height}
                 showOrders={showOrders}
                 calculatedData={calculatedData}
                 candlesChartChildren={candlesChartChildren}/>
    )
  }
}


export default VolumeProfile