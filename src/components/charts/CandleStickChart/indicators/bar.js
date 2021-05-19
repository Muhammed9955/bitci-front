import React from 'react'

import {smaVolume50, ema12, ema26, GREEN_COLOR, RED_COLOR} from '../constants'
import Container from '../views/container'


class Bar extends React.Component {
  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = smaVolume50(ema12(ema26(history)))

    return (
      <Container height={height}
                 showOrders={showOrders}
                 calculatedData={calculatedData}/>
    )
  }
}

export default Bar