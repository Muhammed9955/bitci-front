import {fork} from 'redux-saga/effects'

import initSaga from './init'
import ordersSaga from './orders'
import walletSaga from './wallet'
import routerSaga from './router'
import passwordSaga from './password'
import userSaga from './user'
import f2aSaga from './f2a'
import pairsSaga from './pairs'
import localeSaga from './locale'
import balancesSaga from './balances'
import priceHistorySaga from './priceHistory'
import socketSaga from './socket'
import csvSaga from './csv'
import clipboardSaga from './clipboard'
import localStorageSaga from './localStorage'
import formsSaga from './forms'
import depthSnapshotSaga from './depthSnapshot'
import apiSaga from './api'
import referralSaga from './referal'
import filesSaga from './files'
import titleSaga from './title'
import adminSaga from './admin'


export default function* appSaga() {
  yield fork(apiSaga)
  yield fork(socketSaga)
  yield fork(ordersSaga)
  yield fork(walletSaga)
  yield fork(routerSaga)
  yield fork(passwordSaga)
  yield fork(userSaga)
  yield fork(f2aSaga)
  yield fork(pairsSaga)
  yield fork(balancesSaga)
  yield fork(priceHistorySaga)
  yield fork(localeSaga)
  yield fork(csvSaga)
  yield fork(clipboardSaga)
  yield fork(localStorageSaga)
  yield fork(formsSaga)
  yield fork(depthSnapshotSaga)
  yield fork(referralSaga)
  yield fork(filesSaga)
  yield fork(titleSaga)
  yield fork(adminSaga)

  yield fork(initSaga)
}