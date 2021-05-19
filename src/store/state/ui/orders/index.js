import {ASK_CHANGE_ORDER_PRICE} from './types'


const initialState = {
  askChangeOrderPrice: null,
}

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case ASK_CHANGE_ORDER_PRICE: {
      return {...state, askChangeOrderPrice: payload}
    }

    default: return state
  }
}