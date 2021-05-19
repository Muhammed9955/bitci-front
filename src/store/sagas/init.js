import {call, put, all, select} from 'redux-saga/effects'

import {
  selectPair,
  setLoading,
  updUser,
} from 'store/state/app/actions'

import {updateBalances} from './balances'
import {updatePairs, getLastSelectedPair} from './pairs'


export default function* () {
  yield all([
    call(updatePairs),
    call(updateBalances, true),
    put(updUser()),
  ])

  const lastSelectedPairName = (yield call(getLastSelectedPair)) || 'BTC-USDT'
  const pairs = yield select(({app}) => app.pairs)
  const pairNames = Object.keys(pairs)

  if(pairNames.length > 0) {
    const pair = pairNames.includes(lastSelectedPairName)
      ? lastSelectedPairName
      : pairNames[0]

    yield put(selectPair(pair))
  }

  yield put(setLoading(false))
}