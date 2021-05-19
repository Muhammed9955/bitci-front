import React from 'react'
import last from 'lodash/last'
import max from 'lodash/max'
import first from 'lodash/first'
import min from 'lodash/min'

import * as $ from './index.style'


const CHART_WIDTH = 500
const CHART_HEIGHT = 120
const LINE_WIDTH = 5
const CHART_LUG = LINE_WIDTH * 2
const MIN_VAL_ADJUST = .985

const Tickers = ({tickers, color}) => {
  const values = tickers.map(({close = 0}) => close)
  const maxVal = max(values)
  const minVal = min(values) * MIN_VAL_ADJUST
  const space = CHART_WIDTH / values.length
  const delta = maxVal - minVal
  const k = maxVal === 0 ? 0 : (CHART_HEIGHT - LINE_WIDTH) / (delta === 0 ? 1 : delta)
  const points = values.map((val, index) => [space * index, CHART_HEIGHT - (val - minVal) * k ])
  const fakePoints = [
    [-CHART_LUG, CHART_HEIGHT],
    [-CHART_LUG, first(points)[1]],
    ...points,
    [CHART_WIDTH + CHART_LUG, last(points)[1]],
    [CHART_WIDTH + CHART_LUG, CHART_HEIGHT],
  ]
  const formattedPoints = fakePoints.map((point) => point.join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className={$.tickers}>
      <polyline stroke={color} fill={color} fillOpacity={0.3} strokeWidth={LINE_WIDTH}
                points={formattedPoints}/>
    </svg>
  )
}

export default Tickers