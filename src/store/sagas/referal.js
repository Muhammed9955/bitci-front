import {call, all, put, takeEvery, select} from 'redux-saga/effects'

import {setRefCount, setRefGain, setBEMGain, copyToClipboard} from 'store/state/app/actions'
import {COPY_REFLINK} from 'store/state/app/types'
import * as api from 'api'

export function* loadReferalData () {
  const [refCount, refGain, bemGain] = yield all([
    call(api.getRefereeCount),
    call(api.getRefereeGain),
    call(api.getBEMGain),
  ])

  yield all([
    put(setRefCount(refCount)),
    put(setRefGain(refGain)),
    put(setBEMGain(bemGain)),
  ])
}

function* copyReflink() {
  const {refCode} = yield select(({app}) => app.user)

  yield put(copyToClipboard(`https://${window.location.hostname}/${refCode}/register.html`))
}

export default function* () {
  yield takeEvery(COPY_REFLINK, copyReflink)
}