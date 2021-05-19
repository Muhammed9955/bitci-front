import {takeEvery, select, call, put} from 'redux-saga/effects'

import {TOGGLE_FAVORITES, SET_CURRENCY, SET_VOLUME_MODE} from 'store/state/ui/pairs/types'
import {toggleFavorites, setCurrency, setVolumeMode} from 'store/state/ui/pairs/actions'


const PAIRS_FAVORITES = 'pairsFavorites'
const PAIRS_CURRENCY = 'pairsCurrency'
const PAIRS_VOLUME_MODE = 'pairsVolumeMode'

function* toggleFavoritesHandler() {
  const {favorites} = yield select(({ui}) => ui.pairs)

  favorites
    ? localStorage.setItem(PAIRS_FAVORITES, favorites)
    : localStorage.removeItem(PAIRS_FAVORITES)
}

function* init() {
  if(localStorage.getItem(PAIRS_FAVORITES)) yield put(toggleFavorites(true))
  if(localStorage.getItem(PAIRS_VOLUME_MODE)) yield put(setVolumeMode(true))

  yield put(setCurrency(localStorage.getItem(PAIRS_CURRENCY)))
}

export default function* () {
  yield call(init)

  yield takeEvery(TOGGLE_FAVORITES, toggleFavoritesHandler)

  yield takeEvery(SET_CURRENCY, ({payload}) => (
    payload ? localStorage.setItem(PAIRS_CURRENCY, payload) : localStorage.removeItem(PAIRS_CURRENCY)
  ))

  yield takeEvery(SET_VOLUME_MODE, ({payload}) => (
    payload ? localStorage.setItem(PAIRS_VOLUME_MODE, payload) : localStorage.removeItem(PAIRS_VOLUME_MODE)
  ))
}