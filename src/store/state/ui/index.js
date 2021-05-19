import {combineReducers} from 'redux'

import formsReducer from './forms'
import pairsReducer from './pairs'
import ordersReducer from './orders'

export default combineReducers({
  forms: formsReducer,
  pairs: pairsReducer,
  orders: ordersReducer,
})