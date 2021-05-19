import {PRICE_HISTORY_INTERVALS} from 'utils/constants'

import {
  SET_BALANCES,
  SELECT_PAIR,
  SET_PRICE_HISTORY_INTERVAL,
  SET_ORDERS,
  ADD_ORDER,
  UPD_ORDER,
  SET_WALLET_INFO,
  SET_PAIRS,
  SET_ORDERS_HISTORY,
  SET_LOADING,
  SET_CHANGE_PASSWORD_RESULT,
  SET_USER,
  SET_F2A_SECRET, SET_SEND_F2A_OTP_RESULT,
  OPEN_ORDER,
  UPD_PAIRS,
  SET_PAIR_FAV,
  REVERT_PAIR_FAV,
  SET_REF_COUNT,
  SET_REF_GAIN,
  SET_BEM_GAIN,
  SET_DEPOSITS_HISTORY,
  SET_WITHDRAW_PROCESSING,
} from './types'


const initialState = {
  priceHistoryInterval: PRICE_HISTORY_INTERVALS[1],
  balances: [],
  orders: [],
  ordersHistory: [],
  depositsHistory: {},
  pairs: {},
  walletInfo: {},
  user: {},
  f2aSecret: null,
  changePasswordResult: null,
  sendF2AOtpResult: null,
  selectedPair: null,
  openedOrder: null,
  loading: true,
  refCount: [],
  refGain: [],
  bemGain: [],
  withdrawProcessing: false,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_PAIR: {
      return {...state, selectedPair: payload}
    }
    case SET_PRICE_HISTORY_INTERVAL: {
      return {...state, priceHistoryInterval: payload}
    }
    case SET_BALANCES: {
      return {...state, balances: payload}
    }
    case SET_ORDERS: {
      return {...state, orders: payload}
    }
    case ADD_ORDER: {
      return {...state, orders: state.orders.concat(payload)}
    }
    case UPD_ORDER: {
      const {orders} = state
      const orderIndex = orders.findIndex((order) => (order.id === payload['order_id']))

      if (orderIndex < 0) return state

      const newOrders = [...orders]
      newOrders[orderIndex] = {...orders[orderIndex], status: Number(payload.status)}

      return {...state, orders: newOrders}
    }
    case SET_PAIRS: {
      return {...state, pairs: payload}
    }
    case UPD_PAIRS: {
      const {pairs} = state

      const updatedPairs = {
        ...pairs,
        ...Object.keys(payload).reduce((res, pairName) => {
          res[pairName] = {...pairs[pairName], ...payload[pairName]}

          return res
        }, {}),
      }

      return {...state, pairs: updatedPairs}
    }
    case SET_WALLET_INFO: {
      const {walletInfo: currWalletInfo} = state
      const {currency, info} = payload
      return {
        ...state,
        walletInfo: {
          ...currWalletInfo,
          [currency]: info,
        },
      }
    }
    case SET_ORDERS_HISTORY: {
      return {...state, ordersHistory: payload}
    }
    case SET_DEPOSITS_HISTORY: {
      const {depositsHistory: currDeposits} = state
      const {currency, deposits} = payload

      return {
        ...state,
        depositsHistory: {
          ...currDeposits,
          [currency]: deposits,
        }
      }
    }
    case SET_LOADING: {
      return {...state, loading: payload}
    }
    case SET_CHANGE_PASSWORD_RESULT: {
      return {...state, changePasswordResult: payload}
    }
    case SET_USER: {
      return {...state, user: payload}
    }
    case SET_F2A_SECRET: {
      return {...state, f2aSecret: payload}
    }
    case SET_SEND_F2A_OTP_RESULT: {
      return {...state, sendF2AOtpResult: payload}
    }
    case OPEN_ORDER: {
      return {...state, openedOrder: payload}
    }
    case REVERT_PAIR_FAV:
    case SET_PAIR_FAV: {
      const {pairs: currPairs} = state
      const {pairName, isFavorite} = payload

      if(!currPairs[pairName]) return state

      return {
        ...state,
        pairs: {...currPairs, [pairName]: {...currPairs[pairName], favorite: isFavorite}},
      }
    }
    case SET_REF_COUNT: {
      return {...state, refCount: payload}
    }
    case SET_REF_GAIN: {
      return {...state, refGain: payload}
    }
    case SET_BEM_GAIN: {
      return {...state, bemGain: payload}
    }
    case SET_WITHDRAW_PROCESSING: {
      return {...state, withdrawProcessing: payload}
    }
    default:
      return state
  }
}