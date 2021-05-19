import React from 'react'
import {MovingAverageTooltip} from 'react-stockcharts/lib/tooltip'


const MovingAverageTip = ({ema12, ema26, smaVolume50, ...props}) => (
  <MovingAverageTooltip
    onClick={() => {}}
    width={100}
    options={[
      (smaVolume50 && {
        yAccessor: smaVolume50.accessor(),
        type: 'SMA Volume',
        stroke: smaVolume50.stroke(),
        windowSize: smaVolume50.options().windowSize,
      }),
      {
        yAccessor: ema12.accessor(),
        type: 'EMA',
        stroke: ema12.stroke(),
        windowSize: ema12.options().windowSize,
      },
      {
        yAccessor: ema26.accessor(),
        type: 'EMA',
        stroke: ema26.stroke(),
        windowSize: ema26.options().windowSize,
      },
    ].filter(Boolean)}
    {...props}
  />
)


export default MovingAverageTip