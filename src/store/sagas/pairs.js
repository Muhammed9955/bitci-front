import {eventChannel} from 'redux-saga'
import {takeEvery, put, call, all} from 'redux-saga/effects'

import collectors, {DATA_TYPES} from 'utils/collector'
import {setPairs, updPairs, revertPairFav} from 'store/state/app/actions'
import {SET_PAIR_FAV, SELECT_PAIR} from 'store/state/app/types'
import {pairAdapter} from 'utils/dataAdapters'
import * as api from 'api'


const LAST_SELECTED_PAIR = 'lastSelectedPair'

const pairsUpdateChannel = eventChannel((emit) => {
  const onPairsUpdate = (pairs) => emit(pairs)
  const collector = collectors[DATA_TYPES.COLL_PAIRS]

  collector.subscribe(onPairsUpdate)

  return () => collector.unsubscribe(onPairsUpdate)
})

function* pairsUpdateHandler(pairs) {
  yield put(updPairs(pairs))
}

function* setPairFavHandler({payload}) {
  const {pairName, isFavorite} = payload
  let ok = false

  if(isFavorite) {
    ok = yield call(api.addFavoritePair, pairName)
  } else {
    ok = yield call(api.delFavoritePair, pairName)
  }

  if(!ok) yield put(revertPairFav(pairName, !isFavorite))
}

function* setLastSelectedPair({payload: pair}) {
  localStorage.setItem(LAST_SELECTED_PAIR, pair)
}

export function* getLastSelectedPair() {
  return localStorage.getItem(LAST_SELECTED_PAIR)
}

export function* updatePairs() {
  const [pairs, favoritePairs] = yield all([
    call(api.getPairs),
    call(api.getFavoritePairs)
  ])

  let pairsMap = {}
  if (pairs.length > 0) {
    pairsMap = pairs.reduce((res, pair) => {
      res[pair.Pair] = pairAdapter(pair)
      return res
    }, {})
  }

  yield put(setPairs(pairsMap))

  yield all(
    favoritePairs.map(({Pair}) => put(revertPairFav(Pair, true)))
  )
}

export default function* () {
  yield takeEvery(pairsUpdateChannel, pairsUpdateHandler)

  yield takeEvery(SET_PAIR_FAV, setPairFavHandler)

  yield takeEvery(SELECT_PAIR, setLastSelectedPair)
}