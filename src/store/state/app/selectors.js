import get from 'lodash/get'


export const getPairData = (app, pairName) => get(app, `pairs.${pairName}`, {})

export const getPairCurrencies = (app, pairName) => get(getPairData(app, pairName), 'currencies', ['', ''])

export const getPairsNames = (app) => Object.keys(app.pairs)

export const getPairsList = (app) => getPairsNames(app).map((pairName) => getPairData(app, pairName))

export const getSelectedPairData = (app) => getPairData(app, app.selectedPair)

export const getSelectedPairCurrencies = (app) => getPairCurrencies(app, app.selectedPair)

export const getPriceFormat = (app, pairName = null) => (
  get(pairName ? getPairData(app, pairName) : getSelectedPairData(app), 'format', '0.0')
)

export const getAmountFormat = (app, pairName = null) => (
  get(pairName ? getPairData(app, pairName) : getSelectedPairData(app), 'amountFormat', '0.0')
)

export const getPriceDecimals = (app, pairName = null) => (
  get(pairName ? getPairData(app, pairName) : getSelectedPairData(app), 'decimals', 8)
)

export const getDepositsHistory = (app, currency) => get(app, `depositsHistory.${currency}`, [])

export const getWithdrawalsHistory = (app, currency) => get(app, `withdrawalsHistory.${currency}`, [])

export const getWalletInfo = (app, currency) => get(app, `walletInfo.${currency}`, {})
