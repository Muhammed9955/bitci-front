export default {
  ORDERS: '/orders',
  EXCHANGE: '/exchange',
  MARKETS: '/markets',
  MARKETS_SEARCH: '/markets/search',
  TRADES: '/trades',
  TRADES_ORDERS: '/trades/orders',
  FUNDS: '/funds',
  FUNDS_DEPOSIT: '/funds/:currency/deposit',
  FUNDS_WITHDRAWAL: '/funds/:currency/withdrawal',
  WALLETS: '/wallets',
  WALLETS_SELECTED: '/wallets/:currency/:type',
  WALLETS_HISTORY: '/wallets/:currency/history',
  ACCOUNT: '/account',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USERS_DETAILS: '/admin/users/:userId',
  ADMIN_DEPOSITS: '/admin/deposits',
  EMBEDDED_TEST: '/embedded-test',
}

export const fillPath = (path, params) => (
  Object
    .keys(params)
    .reduce((filledPath, key) => (filledPath.replace(':' + key, params[key])), path)
)