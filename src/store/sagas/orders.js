import {takeEvery, put, fork, cancel, call, select} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import genUUID from 'uuid/v4'
import numeral from 'numeral'

import {PLACE_ORDER, DEL_ORDER, EDIT_ORDER, SELECT_PAIR} from 'store/state/app/types'
import {addOrder, updOrder, setOrdersHistory, setOrders} from 'store/state/app/actions'
import socketContainer, {EVENTS, emitAnswerPromise} from 'utils/socket'
import * as api from 'api'
import {ORDER_TYPES, ORDERS_SIDES} from 'utils/constants'
import {ORDER_BUY} from 'store/state/ui/forms/constants'
import collectors, {DATA_TYPES} from 'utils/collector'
import {orderAdapter} from 'utils/dataAdapters'
import toasts from 'utils/toasts'
import {getPriceFormat, getAmountFormat} from 'store/state/app/selectors'


const newSocketChannel = eventChannel((emit) => {
  const onNewSocket = (newSocket) => emit(newSocket)

  socketContainer.subscribe(onNewSocket)

  return () => socketContainer.unsubscribe(onNewSocket)
})

function* listenToOrderUpdate(socket) {
  const updateChannel = eventChannel((emit) => {
    const onOrderUpdate = (orderUpdate) => emit(orderUpdate)

    socket.on(EVENTS.ORDER_UPDATE, onOrderUpdate)

    return () => socket.off(EVENTS.ORDER_UPDATE, onOrderUpdate)
  })

  yield takeEvery(updateChannel, function* (orderUpdate) {
    yield put(updOrder(orderUpdate))
    toasts.add('Orders are updated')
  })
}

function* placeOrderHandler({payload}) {
  const {form, type} = payload

  const {selectedPair} = yield select(({app}) => app)
  const {size, limit, stop} = yield select(({ui}) => ui.forms[form])
  const priceFormat = yield select(({app}) => getPriceFormat(app))
  const amountFormat = yield select(({app}) => getAmountFormat(app))

  const price = (type === ORDER_TYPES.MARKET ? collectors[DATA_TYPES.COLL_CURRENT_PRICE].getData().current : limit)

  const orderToEmit = {
    'id': genUUID(),
    'created_at': Date.now(),
    "product_id": selectedPair,
    "side": form === ORDER_BUY ? ORDERS_SIDES.BUY : ORDERS_SIDES.SELL,
    "price": Number(numeral(price || 0).format(priceFormat)),
    "size": Number(numeral(size || 0).format(amountFormat)),
    "type": type,
  }

  if(type === ORDER_TYPES.STOP) {
    orderToEmit["stop"] = Number(numeral(stop || 0).format(priceFormat))
  }

  const orderForAdd = {
    id: orderToEmit.id,
    amount: orderToEmit.size,
    price: orderToEmit.price,
    side: orderToEmit.side,
    type: orderToEmit.type,
    stop: orderToEmit.stop,
    status: 0,
  }

  yield put(addOrder(orderForAdd))

  const {ok} = yield emitAnswerPromise(socketContainer.get(), EVENTS.PLACE_ORDER, orderToEmit)

  if (ok) toasts.add('Order is placed', 'success')
  else toasts.add('Error in placing the order', 'error')
}

function* editOrderHandler({payload: editedOrder}) {
  const orders = yield select(({app}) => app.orders)
  const priceFormat = yield select(({app}) => getPriceFormat(app))
  const amountFormat = yield select(({app}) => getAmountFormat(app))

  editedOrder.amount = Number(numeral(editedOrder.amount).format(amountFormat))
  editedOrder.price = Number(numeral(editedOrder.price).format(priceFormat))
  if(editedOrder.stop) editedOrder.stop = Number(numeral(editedOrder.stop).format(priceFormat))

  const orderIndex = orders.findIndex(({id}) => (id === editedOrder.id))
  const newOrders = [...orders.slice(0, orderIndex), editedOrder, ...orders.slice(orderIndex + 1)]

  yield put(setOrders(newOrders))

  // it's required to send `size` not `amount`
  const orderToEmit = {...editedOrder, size: editedOrder.amount}
  delete orderToEmit.amount

  const {ok} = yield emitAnswerPromise(socketContainer.get(), EVENTS.EDIT_ORDER, orderToEmit)

  if(ok) toasts.add('Order is edited', 'success')
  else toasts.add('Error in editing the order', 'error')
}

function* delOrderHandler({payload: orderId}) {
  const orders = yield select(({app}) => app.orders)

  const orderIndex = orders.findIndex(({id}) => (id === orderId))
  const newOrders = [...orders.slice(0, orderIndex), ...orders.slice(orderIndex + 1)]

  yield put(setOrders(newOrders))

  const {ok} = yield emitAnswerPromise(socketContainer.get(), EVENTS.DEL_ORDER, {id: orderId})

  if(ok) toasts.add('Order is deleted', 'success')
  else toasts.add('Error in deleting the order')
}

function* updateOrders() {
  const pairName = yield select(({app}) => app.selectedPair)
  const orders = yield call(api.getOrders, pairName)

  yield put(setOrders(orders.map(orderAdapter)))
}

export function* loadOrdersHistory() {
  const orders = yield call(api.getOrders, 'all')

  yield put(setOrdersHistory(orders.map(orderAdapter)))
}

export default function* () {
  let listenToOrderUpdateTask = yield fork(listenToOrderUpdate, socketContainer.get())

  yield takeEvery(newSocketChannel, function* (newSocket) {
    if (listenToOrderUpdateTask) {
      yield cancel(listenToOrderUpdateTask)
    }

    listenToOrderUpdateTask = yield fork(listenToOrderUpdate, newSocket)
  })

  yield takeEvery(PLACE_ORDER, placeOrderHandler)
  yield takeEvery(EDIT_ORDER, editOrderHandler)
  yield takeEvery(DEL_ORDER, delOrderHandler)
  yield takeEvery(SELECT_PAIR, updateOrders)
}