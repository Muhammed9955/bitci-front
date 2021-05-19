import {takeEvery, put, call} from 'redux-saga/effects'

import {up, connect, disconnect} from 'utils/socket'
import {SOCKET_UP, SOCKET_CONNECT, SOCKET_DISCONNECT, SELECT_PAIR} from 'store/state/app/types'
import {socketUp, socketUpped} from 'store/state/app/actions'


export default function* () {
  yield takeEvery(SOCKET_UP, function* ({payload: pairName}) {
    yield call(up, pairName)
    yield put(socketUpped())
  })

  yield takeEvery(SOCKET_CONNECT, () => connect())
  yield takeEvery(SOCKET_DISCONNECT, () => disconnect())

  yield takeEvery(SELECT_PAIR, function* ({payload: pairName}) {
    yield put(socketUp(pairName))
  })
}
