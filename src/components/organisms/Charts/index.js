import React from 'react'
import {getTranslate} from 'react-localize-redux'
import {connect} from 'react-redux'
import cs from 'classnames'

import CandleStickChart, {IndicatorsMenu} from 'components/charts/CandleStickChart'
import DepthChart from 'components/charts/DepthChart'
import Dropdown from 'components/atoms/Dropdown'
import Toggle from 'components/atoms/Toggle'
import {PRICE_HISTORY_INTERVALS} from 'utils/constants'
import {setPriceHistoryInterval} from 'store/state/app/actions'

import * as $ from './index.style'


const CHARTS = {
  CANDLE: 'candle',
  DEPTH: 'depth'
}

const paddingTop1PxStyle = {
  paddingTop: 1,
}

class Charts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openedChart: CHARTS.CANDLE,
      fullScreenMode: false,
      chartWrapperHeight: null,
      indicator: null,
      ordersLines: true,
    }

    this.chartWrapper = null

    this._openChart = this._openChart.bind(this)
    this._renderChart = this._renderChart.bind(this)
    this._toggleFullScreenMode = this._toggleFullScreenMode.bind(this)
    this._checkWrapperHeight = this._checkWrapperHeight.bind(this)
  }

  componentDidMount() {
    this._checkWrapperHeight()

    window.addEventListener('resize', this._checkWrapperHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._checkWrapperHeight)
  }

  componentDidUpdate() {
    this._checkWrapperHeight()
  }

  render() {
    const {l, interval, intervals, setInterval} = this.props
    const {fullScreenMode, indicator, openedChart, ordersLines} = this.state
    const chartsClassName = cs("main-item-box", fullScreenMode ? $.fsCharts : $.nfsCharts)

    const charts = (
      <div className={chartsClassName}>
        <header>
          <div className="d-flex">
            <h3 className="bordered-title">{l('title')}</h3>
            {/*<ul className="box-list-items">*/}
              {/*<li className="multiple-links">*/}
                {/*<a tabIndex="0">Style 1</a>*/}
                {/*<a className="active" tabIndex="0">Style 2</a>*/}
              {/*</li>*/}
            {/*</ul>*/}
          </div>
          <ul className="box-list-items">
            {openedChart === CHARTS.CANDLE && (
              <li>
                <Toggle sm label={l('ordersLines')} active={ordersLines} onChange={this._toggleOrdersLines}/>
              </li>
            )}
            {openedChart === CHARTS.CANDLE && (
              <li>
                <IndicatorsMenu indicator={indicator} onChange={(i) => this._setIndicator(i)}/>
              </li>
            )}
            <li className="dropdown default-dropdown-item" style={paddingTop1PxStyle}>
              <a tabIndex="0" role="button" onClick={() => this._openChart(CHARTS.CANDLE)}>
                <span>{l('candlestick')}</span>
              </a>
            </li>
            <li className="dropdown default-dropdown-item" style={paddingTop1PxStyle}>
              <a tabIndex="0" role="button" onClick={() => this._openChart(CHARTS.DEPTH)}>
                <span>{l('depth')}</span>
              </a>
            </li>
            {/*<li className="dropdown default-dropdown-item">*/}
              {/*<a tabIndex="0" role="button">*/}
                {/*<span>Overlays</span>*/}
                {/*<span className="icon icon-triangle-down-gray"/>*/}
              {/*</a>*/}
            {/*</li>*/}
            <li>
              <Dropdown value={interval} values={intervals} onChange={setInterval} noFilter/>
            </li>
            <li>
              <a className="icon icon-fullscreen" tabIndex="0" onClick={this._toggleFullScreenMode}/>
            </li>
          </ul>
        </header>
        <div ref={(el) => (this.chartWrapper = el)} className={$.chartWrapper}>
          {this._renderChart()}
        </div>
      </div>
    )

    return fullScreenMode
      ? <div className="modal bd-example-modal-lg" role="dialog" style={{display: 'block'}}>
        {charts}
      </div>
      : charts
  }

  _toggleFullScreenMode() {
    this.setState((prevState) => ({
      fullScreenMode: !prevState.fullScreenMode
    }))
  }

  _toggleOrdersLines = () => {
    this.setState(({ordersLines}) => ({
      ordersLines: !ordersLines,
    }))
  }

  _openChart(chartName) {
    this.setState({
      openedChart: chartName
    })
  }

  _renderChart() {
    const {openedChart, chartWrapperHeight, indicator, ordersLines} = this.state

    if(openedChart === CHARTS.DEPTH) return <DepthChart height={chartWrapperHeight}/>
    if(openedChart === CHARTS.CANDLE) return (
      <CandleStickChart height={chartWrapperHeight} indicator={indicator} showOrders={ordersLines}/>
    )
  }

  _checkWrapperHeight() {
    const height = this.chartWrapper.getBoundingClientRect().height

    if(height !== this.state.chartWrapperHeight) {
      this.setState({
        chartWrapperHeight: height
      })
    }
  }

  _setIndicator = (indicator) => (
    this.setState({indicator})
  )
}

const mapStateToProps = ({app, locale}) => ({
  interval: app.priceHistoryInterval,
  intervals: PRICE_HISTORY_INTERVALS,
  l: (key) => getTranslate(locale)('priceChartPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  setInterval: (period) => dispatch(setPriceHistoryInterval(period)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Charts)