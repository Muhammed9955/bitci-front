import {eventChannel} from 'redux-saga'
import {fork, call, takeEvery, cancel, put} from 'redux-saga/effects'

import socketContainer, {EVENTS} from 'utils/socket'
import * as api from 'api'
import {setBalances} from 'store/state/app/actions'
import toasts from 'utils/toasts'


const newSocketChannel = eventChannel((emit) => {
  const onNewSocket = (newSocket) => emit(newSocket)

  socketContainer.subscribe(onNewSocket)

  return () => socketContainer.unsubscribe(onNewSocket)
})

function* listenToBalanceUpdate(socket) {
  const updateChannel = eventChannel((emit) => {
    const onBalanceUpdate = () => emit({}) // redux-saga requires to pass something

    socket.on(EVENTS.BALANCE_UPDATE, onBalanceUpdate)

    return () => socketContainer.unsubscribe(onBalanceUpdate)
  })

  yield takeEvery(updateChannel, updateBalances)
}

export function* updateBalances (silent) {
  const balances = yield call(api.getBalances)

  yield put(setBalances(balances))

  if(!silent) toasts.add('Balance is updated')
}

export default function* () {
  let listenToBalanceUpdateTask = yield fork(listenToBalanceUpdate, socketContainer.get())

  yield takeEvery(newSocketChannel, function* (newSocket) {
    if(listenToBalanceUpdateTask) {
      yield cancel(listenToBalanceUpdateTask)
    }

    listenToBalanceUpdateTask = yield fork(listenToBalanceUpdate, newSocket)
  })
}