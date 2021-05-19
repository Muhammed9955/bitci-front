import React from 'react'
import {connect} from 'react-redux'
import AmCharts from '@amcharts/amcharts3-react'
import {getTranslate} from 'react-localize-redux'

import {connectData, DATA_TYPES} from 'utils/collector'
import {Desktop, Mobile} from 'components/layout'
import {getSelectedPairCurrencies} from 'store/state/app/selectors'

import {getDesktopConfig, getMobileConfig} from './config'
import processData from './processData'
import * as $ from './index.style'


const DESKTOP_MAX_SIZE = 1000
const MOBILE_MAX_SIZE = 150

const DepthChart = ({sellList, buyList, height = 150, currencies, l}) => {
  const data = []

  processData(buyList, 'bids', true, data)
  processData(sellList, 'asks', false, data)

  const pair = currencies.join('/')

  return (
    <div className={$.depthChart}>
      <Desktop>
        <AmCharts.React style={{height}}
                        options={{...getDesktopConfig(pair), dataProvider: narrowList(data, DESKTOP_MAX_SIZE)}}/>
      </Desktop>

      <Mobile component='div' className={$.inner}>
        <div className={$.labels}>
          <span className={$.bid}>{l('labels.bid')}</span>
          {/*<span>0.07%</span>*/}
          <span className={$.ask}>{l('labels.ask')}</span>
        </div>
        <AmCharts.React style={{height}}
                        options={{...getMobileConfig(pair), dataProvider: narrowList(data, MOBILE_MAX_SIZE)}}/>
      </Mobile>
    </div>
  )
}

const narrowList = (list, maxLength) => {
  const ratio = Math.ceil(list.length / maxLength)

  if(ratio <= 1) return list

  return list.filter((e, i) => (i % ratio === 0))
}

const mapStateToProps = ({app, locale}) => ({
  currencies: getSelectedPairCurrencies(app),
  l: (key) => getTranslate(locale)('depthChart.' + key),
})

export default connect(mapStateToProps)(
  connectData(DATA_TYPES.COLL_DEPTH_DATA_SELL, (sellList) => ({sellList}))(
    connectData(DATA_TYPES.COLL_DEPTH_DATA_BUY, (buyList) => ({buyList}))(
      DepthChart
    )
  )
)