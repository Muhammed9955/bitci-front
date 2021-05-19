import {takeEvery, call, put, select} from 'redux-saga/effects'

import {CHANGE_PASSWORD} from 'store/state/app/types'
import {setChangePasswordResult} from 'store/state/app/actions'
import * as api from 'api'


function* changePasswordHandler({payload}) {
  yield put(setChangePasswordResult(null))

  const {currPass, newPass, newPassRepeat} = payload
  const changeResult = yield call(api.changePassword, currPass, newPass, newPassRepeat)

  yield put(setChangePasswordResult(changeResult))
}

export default function* () {
  yield takeEvery(CHANGE_PASSWORD, changePasswordHandler)
}