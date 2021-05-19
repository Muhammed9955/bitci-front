import {takeEvery, call, put} from 'redux-saga/effects'

import {updUser} from 'store/state/app/actions'
import {UPLOAD_VERIFICATION_DOCS} from 'store/state/app/types'
import toasts from 'utils/toasts'
import * as api from 'api'

function* uploadVerificationDocs ({payload: filesMap}) {
  const result = yield call(api.uploadVerificationDocs, filesMap)

  if(result) {
    toasts.add('Files upload successful', 'success')

    yield put(updUser())
  } else {
    toasts.add('The summarize size of all files must be not larger than 20mb', 'error')
  }
}

export default function* () {
  yield takeEvery(UPLOAD_VERIFICATION_DOCS, uploadVerificationDocs)
}