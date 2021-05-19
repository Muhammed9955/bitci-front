import {
  SET_VALUE,
  CREATE_FORM,
  RESET_FORM,
} from './types'

import {ORDER_BUY, ORDER_SELL, CROSS_ORDER, WITHDRAWAL} from './constants'


const initialState = {
  [ORDER_BUY]: {
    limit: 0,
    size: 0,
    stop: 0,
  },
  [ORDER_SELL]: {
    limit: 0,
    size: 0,
    stop: 0,
  },
  [CROSS_ORDER]: {
    firstCurrency: null,
    secondCurrency: null,
    size: 0,
  },
  [WITHDRAWAL]: {
    address: '',
    tag: '',
    amount: 0,
  }
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_FORM: {
      const {form, fields} = payload

      return {...state, [form]: fields}
    }
    case SET_VALUE: {
      const {form, field, value} = payload
      const fields = {
        ...state[form],
        [field]: value,
      }

      return {...state, [form]: fields}
    }
    case RESET_FORM: {
      const {form} = payload
      const initialForm = initialState[form]

      return {...state, [form]: initialForm}
    }
    default:
      return state
  }
}