import {takeEvery, put} from 'redux-saga/effects'

import {SELECT_PAIR} from 'store/state/app/types'
import {resetForm} from 'store/state/ui/forms/actions'
import {ORDER_BUY, ORDER_SELL} from 'store/state/ui/forms/constants'


function* resetPlaceOrderForms() {
  yield put(resetForm(ORDER_SELL))
  yield put(resetForm(ORDER_BUY))
}

export default function* () {
  yield takeEvery(SELECT_PAIR, resetPlaceOrderForms)
}