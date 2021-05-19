const MAX_PERCENT = 100


export default () => (pairsMap, newData) => {
  return Object.keys(newData).reduce((res, pair) => {
    const {c: current, v: volume, o: open} = newData[pair]
    const change = current - open
    const changePercent = change === 0
      ? 0
      : open === 0
        ? MAX_PERCENT
        : (change / open) * MAX_PERCENT

    res[pair] = {
      pair,
      current,
      change,
      changePercent,
      volume
    }

    return res
  }, {})
}