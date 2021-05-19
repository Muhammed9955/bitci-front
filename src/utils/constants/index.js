export const ORDER_TYPES = {
  MARKET: 'market',
  LIMIT: 'limit',
  STOP: 'stop-limit',
}

export const ORDERS_SIDES = {
  BUY: 'buy',
  SELL: 'sell',
}

export const PRICE_HISTORY_INTERVALS = ['1m', '1h', '6h', '1d', '1w']

export const ORDERS_STATUSES_MAP = {
  SUBMITTED: 0,
  READY_PROCESS: 1,
  FILLED: 2,
  STOP_LIMIT_TRIGGER: 10,
  PARTIALLY_FILLED: 20,
  CANCELLED: 98,
  INSUFFICIENT_FUNDS: 99,
}

export const ORDER_STATUS_CODES_MAP = {
  [ORDERS_STATUSES_MAP.SUBMITTED]: 'submitted',
  [ORDERS_STATUSES_MAP.READY_PROCESS]: 'readyForProcessing',
  [ORDERS_STATUSES_MAP.FILLED]: 'filled',
  [ORDERS_STATUSES_MAP.STOP_LIMIT_TRIGGER]: 'stopLimitTriggerWaiting',
  [ORDERS_STATUSES_MAP.PARTIALLY_FILLED]: 'partiallyFilled',
  [ORDERS_STATUSES_MAP.CANCELLED]: 'cancelled',
  [ORDERS_STATUSES_MAP.INSUFFICIENT_FUNDS]: 'insufficientFunds',
}

export const ID_VERIF_STATUSES = {
  UNVERIFIED: 'Unverified',
  PENDING: 'Pending',
  VERIFIED: 'Verified',
}
