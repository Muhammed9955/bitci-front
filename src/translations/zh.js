export default {
  footer: {
    home: '主业',
    dashboard: '仪表板',
    support: '支持',
    copyright: '版权',
  },
  statusPanel: {
    connected: '连接',
    notConnected: '未连接',
  },
  tabs: {
    exchange: '兑换',
    wallets: '钱包',
    orders: '订单',
    account: '帐号',
    support: '支持',
  },
  pairsPanel: {
    title: '一双',
    all: '全部',
    switcher: {
      change: '换',
      volume: '数量',
    },
    columns: {
      pair: '一双',
      price: '价格',
      change: '换',
      volume: '数量',
    },
  },
  ordersListPanel: {
    openOrders: '等处理订单',
    filledOrders: '完成订单',
    columns: {
      amount: '数量',
      price: '价格 ${currency}',
      total: '总计 ${currency}',
      status: '状态',
    },
  },
  balancesPanel: {
    title: '主题 ',
    total: '总计',
    columns: {
      asset: '财富',
      balance: '余额',
      actions: '交易',
    },
  },
  priceChartPanel: {
    title: '价格表',
    candlestick: '价格',
    depth: '深度',
    '1h': '1小时',
  },
  ordersManagerPanel: {
    market: '市场',
    limit: '限制',
    stop: '停止限制',
  },
  orderForm: {
    bid: '出价',
    ask: '提问',
    stop: '停止',
    limit: '限制',
    amount: '数量',
    total: '总计',
    fee: '回扣',
  },
  tickerPanel: {
    high: '高',
    low: '低',
    change: '换',
    volume: '数量',
    '24h': '24小时',
  },
  orderBookPanel: {
    title: '订单',
    columns: {
      price: '价格（${currency}）',
      amount: '数量',
      total: '总计',
    },
  },
  tradeHistoryPanel: {
    title: '已完成',
    columns: {
      size: '大小',
      price: '价格',
      time: '时间',
    },
  },
  withdrawalsPanel: {
    title: '主题',
    hideSmall: '隐藏少量',
    columns: {
      coin: '银币',
      name: '名称',
      totalBalance: '总余额',
      availableBalance: '可用余额',
      inOrder: '订单中',
      currencyValue: '${currency} 货币值',
    },
    status: {
      estimated: '预计',
      withdrawalLimit: '24小时取款限额',
      inUse: '正在使用',
    },
    btn: {
      deposit: '存款',
      withdrawal: '取款',
      trade: '贸易',
    },
    menu: {
      depositAddress: '${currency} 存款地址',
      withdrawalAddress: '${currency} 取款地址',
      amount: '数量',
      available: '可用',
      fee: '费用',
      willGet: '净额',
      submit: '提交',
      depositTip: {
        title: '重要',
      },
    },
  },
  ordersHistoryPanel: {
    title: '订单历史',
    dateRange: '日期范围',
    pair: '一双',
    side: '种类',
    sides: {
      buy: '购买',
      sell: '卖',
    },
    all: '全部',
    btn: {
      search: '搜查',
      reset: '清理',
      hideCancelled: '隐藏已取消的',
      exportHistory: '导出订单历史',
      detail: '详细',
      next: '下一个',
    },
    columns: {
      date: '日期',
      pair: '一双',
      type: '种类',
      side: '种类',
      avg: '平均',
      price: '价格',
      filled: '已完成',
      amount: '数量',
      total: '总计',
      trigger: '条件',
      status: '状态',
      operation: '交易',
    },
    type: {
      market: '市场',
      limit: '限制',
      stop: '停止限制',
    },
  },
  accountPanel: {
    lvl: '级',
    unverified: '未验证',
    verified: '已验证',
    lastLogin: '最后登录',
    usingBNB: '使用BEM支付费用（打5折)',
    withdrawalLimit: '24小时取款限额',
    higherLimit: '更高限制',
    submitVerification: '提交验证文件',
    contactUs: '联系我们',
  },
  loginPasswordPanel: {
    title: '输入密码',
    desc: '您可以更改您的帐户密码',
    enable: '启用',
    disable: '禁用',
    currPass: '当前密码',
    newPass: '新密码',
    repeatNewPass: '重新输入新密码',
    changePassword: '改密码',
    changed: '已修改！',
    btn: {
      change: '修改',
    },
  },
  twoFactorPanel: {
    title: '双因素认证',
    desc: '启用双因素身份验证以提高安全性',
    typeCode: '在此输入代码',
    success: '成功！',
    btn: {
      enable: '启用',
      disable: '禁用',
    },
  },
  orders: {
    statuses: {
      filled: '已完成',
      cancelled: '已取消',
    },
  },
}