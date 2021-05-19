import {takeLatest, call, select} from 'redux-saga/effects'

import * as api from 'api'
import {SET_PRICE_HISTORY_INTERVAL, SOCKET_CONNECT, SOCKET_UP} from 'store/state/app/types'
import {tickerAdapter} from 'utils/dataAdapters'
import collectors, {DATA_TYPES} from 'utils/collector'
import {calcParams, normalizeRawHistory} from 'utils/tickersHistory'


const historyCollector = collectors[DATA_TYPES.COLL_TICKER_HISTORY]

export function* updatePriceHistory() {
  const {
    selectedPair,
    priceHistoryInterval: interval,
  } = yield select(({app}) => app)

  const {intervalMinutes, fromHour, count} = calcParams(interval)

  const rawHistory = yield call(api.getTickerHistory, selectedPair, fromHour, interval, count)
  const history = normalizeRawHistory(rawHistory, intervalMinutes).map(tickerAdapter)

  historyCollector.reConfig(history, {interval: intervalMinutes})
}

export default function* () {
  yield takeLatest([SOCKET_UP, SOCKET_CONNECT, SET_PRICE_HISTORY_INTERVAL], updatePriceHistory)
}
