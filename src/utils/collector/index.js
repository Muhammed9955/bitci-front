import React from 'react'

import socketContainer, {EVENTS} from 'utils/socket'

import {depthReducer, tickerHistoryReducer, pairsReducer, tradeHistoryReducer, prevAndCurrentReducer} from './reducers'
import Collector from './collector'
import * as DATA_TYPES from './types'


const collectors = {
  [DATA_TYPES.COLL_DEPTH_DATA_BUY]: new Collector(depthReducer, socketContainer.get(), EVENTS.DEPTH_DATA_BUY, []),
  [DATA_TYPES.COLL_DEPTH_DATA_SELL]: new Collector(depthReducer, socketContainer.get(), EVENTS.DEPTH_DATA_SELL, []),
  [DATA_TYPES.COLL_TICKER_HISTORY]: new Collector(tickerHistoryReducer, socketContainer.get(), EVENTS.TICKER, []),
  [DATA_TYPES.COLL_PAIRS]: new Collector(pairsReducer, socketContainer.get(), EVENTS.PAIRS, {}),
  [DATA_TYPES.COLL_TRADE_HISTORY]: new Collector(tradeHistoryReducer, socketContainer.get(), EVENTS.TRADE_HISTORY, []),
  [DATA_TYPES.COLL_CURRENT_PRICE]: new Collector(prevAndCurrentReducer, socketContainer.get(), EVENTS.CURR_PRICE, {}),
  [DATA_TYPES.COLL_CURRENT_TICKER_24]: new Collector(prevAndCurrentReducer, socketContainer.get(), EVENTS.TICKER24, {}),
}

socketContainer.subscribe((newSocket) => {
  Object.values(collectors).forEach((collector) => collector.changeSocket(newSocket))
})

export default collectors

export {DATA_TYPES}

export const connectData = (dataType, mapDataToProps) => (WrappedComponent) => {
  class DataWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: collectors[dataType].getData()
      }

      this._onData = this._onData.bind(this)
    }

    componentDidMount() {
      collectors[dataType].subscribe(this._onData)
    }

    componentWillUnmount() {
      collectors[dataType].unsubscribe(this._onData)
    }

    render() {
      const {data} = this.state

      return (
        <WrappedComponent
          {...this.props}
          {...(mapDataToProps && mapDataToProps(data, this.props))}
        />
      )
    }

    _onData(data) {
      this.setState({
        data
      })
    }
  }

  return DataWrapper
}

export class CollectorWrapper extends React.Component {
  constructor(props) {
    super(props)

    const {collector} = props

    this._collector = collector
    this.state = {data: collector.getData()}
  }

  componentDidMount() {
    this._collector.subscribe(this._onData)
  }

  componentWillUnmount() {
    this._collector.unsubscribe(this._onData)
  }

  render() {
    const {render} = this.props
    const {data} = this.state

    return render && render(data)
  }

  _onData = (data) => {
    this.setState({
      data
    })
  }
}