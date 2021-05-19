import {
  SELECT_PAIR,
  SET_PRICE_HISTORY_INTERVAL,
  SET_BALANCES,
  PLACE_ORDER,
  SET_ORDERS,
  ADD_ORDER,
  UPD_ORDER,
  SET_WALLET_INFO,
  SET_PAIRS,
  UPD_PAIRS,
  SET_ORDERS_HISTORY,
  SET_LOADING,
  CHANGE_PASSWORD,
  SET_CHANGE_PASSWORD_RESULT,
  UPD_USER,
  SET_USER,
  UPD_F2A_SECRET,
  SET_F2A_SECRET,
  SEND_F2A_OTP,
  SET_SEND_F2A_OTP_RESULT,
  EDIT_ORDER,
  DEL_ORDER,
  OPEN_ORDER,
  SET_PAIR_FAV,
  REVERT_PAIR_FAV,
  SOCKET_UP,
  SOCKET_UPPED,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  LOGOUT_USER,
  EXPORT_ARRAY_AS_CSV,
  COPY_TO_CLIPBOARD,
  COPY_REFLINK,
  TOKEN_EXPIRED,
  SET_REF_COUNT,
  SET_REF_GAIN,
  SET_BEM_GAIN,
  SET_DEPOSITS_HISTORY,
  UPLOAD_VERIFICATION_DOCS,
  WITHDRAW,
  SET_WITHDRAW_PROCESSING,
} from './types'


export const selectPair = (pair) => ({
  type: SELECT_PAIR,
  payload: pair,
})

export const setPriceHistoryInterval = (period) => ({
  type: SET_PRICE_HISTORY_INTERVAL,
  payload: period,
})

export const setBalances = (balances) => ({
  type: SET_BALANCES,
  payload: balances,
})

export const placeOrder = (form, type) => ({
  type: PLACE_ORDER,
  payload: {form, type},
})

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
})

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
})

export const updOrder = (orderUpdate) => ({
  type: UPD_ORDER,
  payload: orderUpdate,
})

export const setPairs = (pairs) => ({
  type: SET_PAIRS,
  payload: pairs,
})

export const updPairs = (pairs) => ({
  type: UPD_PAIRS,
  payload: pairs,
})

export const setWalletInfo = (currency, info) => ({
  type: SET_WALLET_INFO,
  payload: {currency, info},
})

export const setOrdersHistory = (orders) => ({
  type: SET_ORDERS_HISTORY,
  payload: orders,
})

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
})

export const changePassword = (currPass, newPass, newPassRepeat) => ({
  type: CHANGE_PASSWORD,
  payload: {currPass, newPass, newPassRepeat},
})

export const setChangePasswordResult = (changeResult) => ({
  type: SET_CHANGE_PASSWORD_RESULT,
  payload: changeResult,
})

export const updUser = () => ({
  type: UPD_USER,
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
})

export const updF2ASecret = () => ({
  type: UPD_F2A_SECRET,
})

export const setF2ASecret = (secret) => ({
  type: SET_F2A_SECRET,
  payload: secret,
})

export const sendF2AOtp = (otp) => ({
  type: SEND_F2A_OTP,
  payload: otp,
})

export const setSendF2AOtpResult = (result) => ({
  type: SET_SEND_F2A_OTP_RESULT,
  payload: result,
})

export const editOrder = (editedOrder) => ({
  type: EDIT_ORDER,
  payload: editedOrder,
})

export const delOrder = (orderId) => ({
  type: DEL_ORDER,
  payload: orderId,
})

export const openOrder = (order) => ({
  type: OPEN_ORDER,
  payload: order,
})

export const setPairFav = (pairName, isFavorite) => ({
  type: SET_PAIR_FAV,
  payload: {pairName, isFavorite},
})

export const revertPairFav = (pairName, isFavorite) => ({
  type: REVERT_PAIR_FAV,
  payload: {pairName, isFavorite},
})

export const socketUp = (pairName) => ({
  type: SOCKET_UP,
  payload: pairName,
})

export const socketUpped = () => ({
  type: SOCKET_UPPED,
})

export const socketConnect = () => ({
  type: SOCKET_CONNECT,
})

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
})

export const exportArrayAsCSV = (filename, array) => ({
  type: EXPORT_ARRAY_AS_CSV,
  payload: {filename, array},
})

export const copyToClipboard = (text) => ({
  type: COPY_TO_CLIPBOARD,
  payload: text,
})

export const copyReflink = () => ({
  type: COPY_REFLINK,
})

export const tokenExpired = () => ({
  type: TOKEN_EXPIRED,
})

export const setRefCount = (refCount) => ({
  type: SET_REF_COUNT,
  payload: refCount,
})

export const setRefGain = (refGain) => ({
  type: SET_REF_GAIN,
  payload: refGain,
})

export const setBEMGain = (bemGain) => ({
  type: SET_BEM_GAIN,
  payload: bemGain,
})

export const setDepositsHistory = (currency, deposits) => ({
  type: SET_DEPOSITS_HISTORY,
  payload: {currency, deposits},
})

export const uploadVerificationDocs = (filesMap) => ({
  type: UPLOAD_VERIFICATION_DOCS,
  payload: filesMap,
})

export const withdraw = (currency) => ({
  type: WITHDRAW,
  payload: {currency},
})

export const setWithdrawProcessing = (isProcessing) => ({
  type: SET_WITHDRAW_PROCESSING,
  payload: isProcessing,
})
