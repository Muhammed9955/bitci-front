import {takeEvery, put, call} from 'redux-saga/effects'

import {UPD_USER, LOGOUT_USER, TOKEN_EXPIRED} from 'store/state/app/types'
import {setUser} from 'store/state/app/actions'
import * as api from 'api'


const toRoot = () => window.location = '/'

function* updUserHandler() {
  const {ownrefcode, otprequired, username, admin, idverified} = yield call(api.getAccountInfo)

  yield put(setUser({
    username,
    admin,
    refCode: ownrefcode,
    f2a: Boolean(otprequired),
    idVerification: idverified,
  }))
}

function* logoutUserHandler() {
  const ok = yield call(api.logout)

  if (ok) {
    yield call(toRoot)
  }
}

export default function* () {
  yield takeEvery(UPD_USER, updUserHandler)
  yield takeEvery(LOGOUT_USER, logoutUserHandler)
  yield takeEvery(TOKEN_EXPIRED, toRoot)
}