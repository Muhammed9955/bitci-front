import {takeEvery, put} from 'redux-saga/effects'

import {EVENTS} from 'api/emitter'
import {tokenExpired} from 'store/state/app/actions'

import apiEventChannel from './channels/apiEvent'


function* tokenExpiredHandler() {
  yield put(tokenExpired())
}

export default function* () {
  yield takeEvery(apiEventChannel(EVENTS.TOKEN_EXPIRED), tokenExpiredHandler)
}
