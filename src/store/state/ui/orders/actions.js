import {ASK_CHANGE_ORDER_PRICE} from './types'


export const askChangeOrderPrice = (order, newPrice) => ({
  type: ASK_CHANGE_ORDER_PRICE,
  payload: !order ? null : {order, newPrice},
})
