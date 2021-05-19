import {select, takeEvery} from 'redux-saga/effects'
import numeral from 'numeral'

import collectors, {DATA_TYPES} from 'utils/collector'
import {getPriceFormat} from 'store/state/app/selectors'

import collectorDataChannel from './channels/collectorData'

const TITLE_POSTFIX = ' - Dashboard'

function* updateTitle({current}) {
  const pair = yield select(({app}) => app.selectedPair)
  const priceFormat = yield select(({app}) => getPriceFormat(app, pair))
  const price = numeral(current).format(priceFormat)

  document.title = `${price} ${pair} ${TITLE_POSTFIX}`
}

export default function* () {
  const collector = collectors[DATA_TYPES.COLL_CURRENT_PRICE]

  yield takeEvery(collectorDataChannel(collector), updateTitle)
}