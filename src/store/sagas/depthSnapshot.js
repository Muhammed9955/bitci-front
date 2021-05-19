import {takeEvery, cancel, fork} from 'redux-saga/effects'

import socketContainer, {EVENTS} from 'utils/socket'
import {SOCKET_UPPED} from 'store/state/app/types'
import collectors, {DATA_TYPES} from 'utils/collector'

import socketEventChannel from './channels/socketEvent'


function* snapshotUpdateListener(socket) {
  yield takeEvery(socketEventChannel(socket, EVENTS.DEPTH_SNAPSHOT), function* (snapshot) {
    collectors[DATA_TYPES.COLL_DEPTH_DATA_BUY].reset(snapshot['buy'], true)
    collectors[DATA_TYPES.COLL_DEPTH_DATA_SELL].reset(snapshot['sell'], true)
  })
}

export default function* () {
  let listenSnapshotUpdateTask = yield fork(snapshotUpdateListener, socketContainer.get())

  yield takeEvery(SOCKET_UPPED, function* () {
    if(listenSnapshotUpdateTask) {
      yield cancel(listenSnapshotUpdateTask)
    }

    listenSnapshotUpdateTask = yield fork(snapshotUpdateListener, socketContainer.get())
  })
}