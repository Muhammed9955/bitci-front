import {takeEvery, call, put, select} from 'redux-saga/effects'
import isEmpty from 'lodash/isEmpty'
import genUUID from 'uuid/v4'

import {WITHDRAW} from 'store/state/app/types'
import {setWalletInfo, setDepositsHistory, setWithdrawProcessing} from 'store/state/app/actions'
import {resetForm} from 'store/state/ui/forms/actions'
import {WITHDRAWAL} from 'store/state/ui/forms/constants'
import {depositAdapter} from 'utils/dataAdapters'
import * as api from 'api'
import toasts from 'utils/toasts'


function* withdrawHandler({payload}) {
  const {currency} = payload
  const {address, amount, tag} = yield select(({ui}) => ui.forms[WITHDRAWAL])

  yield put(setWithdrawProcessing(true))

  const result = yield call(api.withdraw, genUUID(), currency, address, amount, tag)

  yield put(setWithdrawProcessing(false))

  if(result) {
    toasts.add('Withthdrawal request submitted', 'success')

    yield put(resetForm(WITHDRAWAL))
  } else {
    toasts.add('Withthdrawal request error', 'error')
  }
}

function* updateWalletInfo(currency) {
  const {address, tag} = yield call(api.getWalletAddress, currency)

  yield put(setWalletInfo(currency, {address, tag}))
}

export function* checkForUpdateWalletInfo(currency) {
  const walletInfo = yield select(({app}) => app.walletInfo[currency])

  if (isEmpty(walletInfo)) yield call(updateWalletInfo, currency)
}

export function* updateDepositsHistory(currency) {
  const history = yield call(api.getDepositsHistory, currency)

  yield put(setDepositsHistory(currency, history.map(depositAdapter)))
}

export default function* () {
  yield takeEvery(WITHDRAW, withdrawHandler)
}