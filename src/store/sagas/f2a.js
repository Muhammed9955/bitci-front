import {takeEvery, call, put} from 'redux-saga/effects'

import {UPD_F2A_SECRET, SEND_F2A_OTP} from 'store/state/app/types'
import {setF2ASecret, setSendF2AOtpResult, updUser} from 'store/state/app/actions'
import * as api from 'api'


function* updF2ASecretHandler() {
  yield put(setF2ASecret(null))

  const secret = yield call(api.getF2ASecret)

  yield put(setF2ASecret(secret))
}

function* sendF2AOtpHandler({payload: otp}) {
  yield put(setSendF2AOtpResult(null))

  const result = yield call(api.sendF2AOtp, otp)

  yield put(setSendF2AOtpResult(result))
  yield put(updUser())
}

export default function* () {
  yield takeEvery(UPD_F2A_SECRET, updF2ASecretHandler)

  yield takeEvery(SEND_F2A_OTP, sendF2AOtpHandler)
}