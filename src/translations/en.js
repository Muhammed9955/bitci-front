export default {
  footer: {
    home: 'HOME',
    dashboard: 'EXCHANGE',
    support: 'SUPPORT',
    copyright: 'Copyright ${year}  All rights Reserved',
  },
  statusPanel: {
    connected: 'Connected',
    notConnected: 'Not Connected',
    logout: 'LOGOUT',
  },
  tabs: {
    exchange: 'Exchange',
    wallets: 'Wallets',
    orders: 'Orders',
    account: 'Account',
    support: 'Support',
    markets: 'Markets',
    trades: 'Trades',
    funds: 'Funds',
  },
  exchangePage: {
    crossOrder: 'Cross Order',
  },
  pairsPanel: {
    title: 'Pairs',
    all: 'All',
    switcher: {
      change: 'CHANGE',
      volume: 'VOLUME',
    },
    columns: {
      pair: 'Pair',
      price: 'Price',
      change: 'Change',
      volume: 'Volume',
    },
  },
  ordersListPanel: {
    openOrders: 'Open Orders',
    filledOrders: 'Filled Orders',
    columns: {
      amount: 'Amount',
      price: 'Price ${currency}',
      total: 'Total ${currency}',
      status: 'Status/Actions',
    },
  },
  balancesPanel: {
    title: 'Your Balances',
    total: 'TOTAL',
    columns: {
      asset: 'Asset',
      balance: 'Balance',
      actions: 'Actions',
    },
  },
  priceChartPanel: {
    title: 'Price Chart',
    candlestick: 'Candlestick',
    depth: 'Depth',
    '1h': '1h',
    ordersLines: 'Orders Lines',
  },
  ordersManagerPanel: {
    market: 'Market',
    limit: 'Limit',
    stop: 'Stop Limit',
  },
  orderForm: {
    bid: 'Bid',
    ask: 'Ask',
    stop: 'Stop',
    limit: 'Limit Price',
    amount: 'Amount',
    total: 'Total',
    fee: 'Fee',
    equivalent: 'Equivalent',
    available: 'Avbl',
    minAmountTip: 'Min. order amount is ${amount}',
    minTotalTip: 'Min. total price is ${total}',
    minPriceTip: 'Min. price is ${price}',
    edit: 'EDIT',
    changePrice: 'CHANGE PRICE',
    cancel: 'CANCEL',
  },
  tickerPanel: {
    high: 'High',
    low: 'Low',
    change: 'Change',
    volume: 'Vol',
    '24h': '24h',
  },
  orderBookPanel: {
    title: 'Order Book',
    columns: {
      price: 'Price (${currency})',
      amount: 'Amount',
      total: 'Total',
    },
  },
  tradeHistoryPanel: {
    title: 'Trade History',
    columns: {
      size: 'Size',
      price: 'Price',
      time: 'Time',
    },
  },
  withdrawalsPanel: {
    title: 'Deposits & Withdrawals',
    hideSmall: 'Hide Small Assets',
    columns: {
      coin: 'Coin',
      name: 'Name',
      totalBalance: 'Total Balance',
      availableBalance: 'Available Balance',
      inOrder: 'In Order',
      currencyValue: '${currency} Value',
    },
    status: {
      estimated: 'Estimated Value',
      withdrawalLimit: '24h Withdrawal Limit',
      inUse: 'In Use',
    },
    btn: {
      history: 'HISTORY',
      deposit: 'DEPOSIT',
      withdrawal: 'WITHDRAWAL',
      trade: 'TRADE',
    },
    menu: {
      depositAddress: '${currency} Deposit Address',
      depositTag: 'Deposit Tag',
      withdrawalAddress: '${currency} Withdrawal Address',
      withdrawalTag: 'Withdrawal Tag',
      amount: 'Amount',
      available: 'Available',
      fee: 'Transaction fee',
      willGet: 'You Will Get',
      submit: 'SUBMIT',
      depositTip: {
        title: 'IMPORTANT',
        desc: 'Lorem ipsum dolor sit amet, exerci eloquentiam nec et, no duis melius invenire sit. At nam graeci eripuit. Possit scripserit ne has, nulla nominavi eu qui. Has essent cotidieque an. Veritus volutpat abhorreant ad qui. Oratio albucius voluptua ut mel.',
      },
      withdrawalTip: {
        desc: 'You need to be a verified user in order to withdraw funds',
      },
      withdrawalDangerTip: '* Lorem ipsum dolor sit amet, exerci eloquentiam nec et, no duis.',
      withdrawalErrors: {
        wrongAddress: 'The address is not valid',
        wrongTag: 'The tag is not valid',
        insufficientBalance: 'Insufficient balance',
        amountLessFee: 'The amount needs to be greater than the transaction fee',
        minAmount: 'The amount is less than min. withdrawal amount: ${min}',
      }
    },
  },
  depositsWithdrawalsHistoryPanel: {
    deposits: {
      title: 'Deposits History',
      exportHistory: 'Export Complete Deposit History',
    },
    withdrawals: {
      title: 'Withdrawals History',
      exportHistory: 'Export Complete Withdrawal History',
    },
  },
  transactionsHistory: {
    address: 'Address',
    txid: 'Txid',
    check: 'CHECK',
    noMore: 'No More',
    statuses: {
      completed: 'Completed',
    },
  },
  ordersHistoryPanel: {
    title: 'Orders History',
    dateRange: 'Date Range',
    pair: 'Pair',
    side: 'Side',
    sides: {
      buy: 'Buy',
      sell: 'Sell',
    },
    all: 'All',
    btn: {
      search: 'SEARCH',
      reset: 'RESET',
      hideCancelled: 'Hide All Cancelled',
      exportHistory: 'Export Complete Order History',
      detail: 'DETAIL',
      next: 'NEXT',
    },
    columns: {
      date: 'Date',
      pair: 'Pair',
      type: 'Type',
      side: 'Side',
      avg: 'Avg',
      price: 'Price',
      filled: 'Filled',
      amount: 'Amount',
      total: 'Total',
      trigger: 'Trigger Conditions',
      status: 'Status',
      operation: 'Operation',
    },
    type: {
      market: 'Market',
      limit: 'Limit',
      stop: 'Stop-Limit',
    },
  },
  accountPanel: {
    title: 'Account',
    lvl: 'Lv.',
    unverified: 'Unverified',
    verified: 'Verified',
    lastLogin: 'Last Login Time',
    usingBNB: 'Using BEM to pay for fees (50% discount)',
    identifyAuth: 'Identify Authentication',
    googleAuth: 'Two Factor Authentication',
    smsAuth: 'SMS Authenticator',
    settings: 'Settings',
    withdrawalLimit: '24h Withdrawal Limit',
    higherLimit: 'Higher Limit',
    submitVerification: 'Submit Verification Documents',
    contactUs: 'Contact Us',
    logout: 'LOGOUT',
    on: 'ON',
    off: 'OFF',
  },
  loginPasswordPanel: {
    title: 'Login password',
    desc: 'You can change your account password',
    enable: 'ENABLE',
    disable: 'DISABLE',
    currPass: 'current password',
    newPass: 'new password',
    repeatNewPass: 'repeat new password',
    changePassword: 'CHANGE PASSWORD',
    changed: 'Changed!',
    btn: {
      change: 'CHANGE',
    },
  },
  twoFactorPanel: {
    title: 'Two Factor Authentication',
    desc: 'Enable Two Factor Authentication for better security',
    typeCode: 'type code here',
    success: 'Success!',
    btn: {
      enable: 'ENABLE',
      disable: 'DISABLE',
    },
  },
  submitIDDocsPanel: {
    title: 'Submit Verification Documents',
    desc: 'You can submit your verification documents here',
    frontTip: 'Front page of your ID document',
    backTip: 'Back page of your ID document',
    selfieTip: 'Selfie with the front page of your ID',
    btn: {
      submit: 'SUBMIT',
      upload: 'UPLOAD',
    },
  },
  candlestickChart: {
    indicator: 'Indicator',
    movingAverage: 'Moving Average',
    bollingerBand: 'Bollinger Band',
    sar: 'SAR',
    volumeProfile: 'Volume Profile',
    volumeProfileSession: 'Volume Profile by Session',
    macd: 'MACD',
    fibonacci: 'Fibonacci Retracement',
  },
  marketsPanel: {
    title: 'Markets',
    favorites: 'Favorites',
    table: {
      pairVol: 'Pair / Vol',
      lastPrice: 'Last Price',
      change24: '24h Chg%',
      vol: 'Vol.',
    },
  },
  tradesPanel: {
    tabs: {
      buy: 'Buy',
      sell: 'Sell',
      openOrders: 'Open Orders',
    },
    orderTypes: {
      'market': 'Market Order',
      'limit': 'Limit Order',
      'stop-limit': 'Stop-Limit Order',
    },
    btns: {
      buy: 'BUY',
      sell: 'SELL',
    },
    tradeHistory: 'Trade History',
    sides: {
      buy: 'Buy',
      sell: 'Sell',
    },
    price: 'Price',
    amount: 'Amount',
    total: 'Total',
  },
  depthChart: {
    labels: {
      ask: 'Ask',
      bid: 'Bid',
    },
  },
  crossOrderPanel: {
    currency: 'Currency',
    btns: {
      comingSoon: 'COMING SOON',
    },
  },
  fundsPanel: {
    title: 'Funds',
    history: 'History',
    estimated: 'Estimated Value',
    btns: {
      deposit: 'DEPOSIT',
      withdrawal: 'WITHDRAWAL',
      showAllBalances: 'Show All Balances',
    },
  },
  refCountTable: {
    title: 'Referral Count',
    columns: {
      lvl: 'Lvl',
      users: 'Users',
      activeUsers: 'Active Users',
    },
  },
  refGainTable: {
    title: 'Referral Earning',
    columns: {
      currency: 'Currency',
      lvl1: 'Lvl 1',
      lvl2: 'Lvl 2',
      lvl3: 'Lvl 3',
    },
  },
  bemGainTable: {
    title: 'ABC Earning',
    columns: {
      date: 'Date',
      amount: 'Amount',
    },
  },
  orders: {
    statuses: {
      submitted: 'Submitted',
      readyForProcessing: 'Ready for processing',
      stopLimitTriggerWaiting: 'Stop-limit trigger waiting',
      partiallyFilled: 'Partially Filled',
      insufficientFunds: 'Insufficient Funds',
      filled: 'Filled',
      cancelled: 'Cancelled',
    },
  },
  tickersTable: {
    headers: {
      pair: 'Pair',
      price: 'Price',
      high: 'High',
      low: 'Low',
      volume: 'Volume',
      change: 'Change',
      chart: 'Chart',
    }
  }
}