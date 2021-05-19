const DOT_NET_MAX_VALUE = +7.922816251426434e+28
const DOT_NET_MIN_VALUE = -7.922816251426434e+28

const isNotMarketPrice = (priceString) => {
  const price = Number(priceString)

  return price !== DOT_NET_MAX_VALUE && price !== DOT_NET_MIN_VALUE
}

export default (initialRawData = {}) => {
  let rawData = {...initialRawData}

  return (list, newData) => {
    const newDataCopy = Object.keys(newData)
      .filter(isNotMarketPrice)
      .reduce((d, price) => {
        d[Number(price)] = newData[price]
        return d
      }, {})

    Object.keys(newDataCopy).forEach((price) => {
      if (newDataCopy[price] === 0) {
        delete newDataCopy[price]
        delete rawData[price]
      }
    })

    rawData = {...rawData, ...newDataCopy}

    return Object.keys(rawData)
      .map((price) => ({
        price: Number(price),
        size: rawData[price],
        total: price * rawData[price],
      }))
      .sort((a, b) => (a.price > b.price ? -1 : 1))
  }
}