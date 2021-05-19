const MS_IN_SEC = 1000

export const tickerAdapter = (newTicker) => {
  return {
    timestamp: newTicker.t,
    date: new Date(newTicker.t * MS_IN_SEC),
    open: newTicker.o,
    high: newTicker.h,
    low: newTicker.l,
    close: newTicker.c,
    volume: newTicker.v
  }
}

export const orderAdapter = (order) => ({...order, status: Number(order.status)})

export const depositAdapter = ({Amount, BlockNumber, CurrencyType, DepositDate, TxnHash}) => ({
  amount: Amount,
  block: BlockNumber,
  currency: CurrencyType,
  date: DepositDate,
  hash: TxnHash,
})

export const pairAdapter = (pair) => {
  const getFormat = (decimals) => {
    let format = '0.'

    for(let i = 0; i < decimals; i++) {
      format += '0'
    }

    return format
  }

  const getFormatByTick = (tickSize) => {
    const tickSizeString = tickSize.toString()
    const match = tickSizeString.match(/^.*e-([0-9]+)$/)

    if(match) {
      const decimals = match[1]

      return getFormat(decimals)
    } else {
      return tickSizeString.replace(/[1-9]/g, '0')
    }
  }

  return {
    pair: pair.Pair,
    minTrade: pair.minTrade,
    tickSize: pair.tickSize,
    minTotal: pair.minNotional,
    format: getFormat(pair.decimalPlaces),
    decimals: pair.decimalPlaces,
    amountFormat: getFormatByTick(pair.minTrade),
    currencies: pair.Pair.split('-'),
  }
}
