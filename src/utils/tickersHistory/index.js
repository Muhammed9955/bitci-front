const ONE_MINUTE = 1
const HISTORY_LENGTH = 60
const MS_IN_SEC = 1000
const MIN_IN_HOUR = 60
const SEC_IN_MIN = 60
export const INTERVALS = {
  '1m': ONE_MINUTE,
  '1h': MIN_IN_HOUR,
  '6h': MIN_IN_HOUR * 6,
  '1d': MIN_IN_HOUR * 24,
  '1w': MIN_IN_HOUR * 24 * 7,
}

const getSeconds = (date) => (
  Math.floor(date.getTime() / MS_IN_SEC)
)

const getBehindHour = (seconds) => {
  const currSeconds = getSeconds(new Date)
  const behindSeconds = currSeconds - seconds

  const behindDate = new Date(behindSeconds * MS_IN_SEC)
  behindDate.setMinutes(0)
  behindDate.setSeconds(0)

  return getSeconds(behindDate)
}

export const getCurrentTimestamp = (intervalMinutes) => {
  const nowDate = new Date()
  nowDate.setSeconds(0)

  if(intervalMinutes === INTERVALS['1m']) {
    return getSeconds(nowDate)
  }

  if(intervalMinutes === INTERVALS['1h']) {
    nowDate.setMinutes(0)
    return getSeconds(nowDate)
  }

  throw new Error('Unsupported minutes interval!')
}

export const normalizeRawHistory = (history, intervalMinutes, length = HISTORY_LENGTH) => {
  const paddedHistory = new Array(length)

  const nowDate = new Date
  if (intervalMinutes !== ONE_MINUTE) nowDate.setMinutes(0)
  nowDate.setSeconds(0)

  const nowSeconds = getSeconds(nowDate)

  let seconds = nowSeconds - (intervalMinutes * SEC_IN_MIN * length)
  let paddedIndex = 0
  let historyIndex = 0

  const cuttedHistory = history.reduce((res, tick) => tick.t < seconds ? res : res.concat(tick), [])

  for (; seconds <= nowSeconds; seconds = seconds + intervalMinutes * SEC_IN_MIN) {
    const tick = cuttedHistory[historyIndex]

    if (!tick) {
      paddedHistory[paddedIndex++] = {t: seconds}
      continue
    }

    if (seconds !== tick.t) {
      paddedHistory[paddedIndex++] = {t: seconds}
    } else {
      paddedHistory[paddedIndex++] = tick
      historyIndex++
    }
  }

  return paddedHistory
}

export const calcParams = (interval, length = HISTORY_LENGTH) => {
  const intervalMinutes = INTERVALS[interval]
  const periodInSeconds = intervalMinutes * length * SEC_IN_MIN
  const fromHour = getBehindHour(periodInSeconds)
  const currSeconds = getSeconds(new Date)
  const deltaMinutes = Math.floor((currSeconds - fromHour) / SEC_IN_MIN)
  const count = Math.floor(deltaMinutes / intervalMinutes)

  return {
    intervalMinutes,
    fromHour,
    count,
  }
}