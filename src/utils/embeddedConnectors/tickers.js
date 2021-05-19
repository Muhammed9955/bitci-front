import React from 'react'
import EventEmitter from 'wolfy87-eventemitter'

import * as api from 'api'
import socketContainer, {EVENTS} from 'utils/socket'
import {pairAdapter, tickerAdapter} from 'utils/dataAdapters'
import {calcParams, normalizeRawHistory} from 'utils/tickersHistory'
import {tickerHistoryReducer} from 'utils/collector/reducers'
import Collector from 'utils/collector/collector'


const LENGTH = 24
const INTERVAL = '1h'

export default (mapStateToProps) => (WrappedComponent) => (
  class TickersProvider extends React.Component {
    state = {pairs: [], loading: true}
    _collectorsByPair = {}
    _emitter = new EventEmitter

    componentDidMount() {
      this._initPairs()
        .then(this._initCollectors)
        .then(() => {
          const socket = socketContainer.get()

          socket.connect()

          socket.on(EVENTS.PAIRS, (pairsMap) => {
            const pairs = Object.keys(pairsMap)

            pairs.forEach((pair) => {
              this._emitter.emit(pair, pairsMap[pair])
            })
          })

          this.setState({loading: false})
        })
    }

    render() {
      const {pairs, loading} = this.state

      return <WrappedComponent {...mapStateToProps(pairs, this._collectorsByPair, loading)}/>
    }

    _initPairs = () => (
      api.getPairs()
        .then((rawPairs) => {
          const pairs = rawPairs.map(pairAdapter)

          this.setState({pairs})

          return pairs
        })
    )

    _initCollectors = async () => {
      const {fromHour, count, intervalMinutes} = calcParams(INTERVAL, LENGTH)

      const tickers = await api.getTickers(fromHour, INTERVAL, count)

      this._collectorsByPair = tickers.reduce((res, {pair, tickers}) => {
        const collector = new Collector(tickerHistoryReducer, this._emitter, pair, [])

        collector.reConfig(normalizeRawHistory(tickers, intervalMinutes, LENGTH).map(tickerAdapter), {interval: intervalMinutes})
        res[pair] = collector

        return res
      }, {})
    }
  }
)