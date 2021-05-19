import {takeEvery, call} from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'react-router-redux'
import {matchPath} from 'react-router-dom'

import paths from 'utils/paths'

import {loadOrdersHistory} from './orders'
import {loadReferalData} from './referal'
import {updateDepositsHistory, checkForUpdateWalletInfo} from './wallet'


export default function* () {
  yield takeEvery(LOCATION_CHANGE, function* ({payload}) {
    const {pathname} = payload
    let match = null

    if (matchPath(pathname, paths.ORDERS)) {
      yield call(loadOrdersHistory)
    } else if (matchPath(pathname, paths.ACCOUNT)) {
      yield call(loadReferalData)
    } else if (match = matchPath(pathname, paths.WALLETS_HISTORY)) {
      yield call(updateDepositsHistory, match.params.currency)
    } else if (
      (match = matchPath(pathname, paths.WALLETS_SELECTED))
      || (match = matchPath(pathname, paths.FUNDS_DEPOSIT))
      || (match = matchPath(pathname, paths.FUNDS_WITHDRAWAL))
    ) {
      yield call(checkForUpdateWalletInfo, match.params.currency)
    }
  })
}
