import {tickerAdapter} from 'utils/dataAdapters'
import {getCurrentTimestamp} from 'utils/tickersHistory'


const HISTORY_LENGTH = 60
const SEC_IN_MIN = 60

export default ({interval = 1}) => {
  return (history = [], newRawTick) => {
    let newHistory = null
    const lastTick = history[history.length - 1]

    // fix for `pairs` socket event, where the `t` is 0 always
    if(newRawTick.t === 0) newRawTick.t = getCurrentTimestamp(interval)

    if(lastTick && lastTick.timestamp - newRawTick.t < interval * SEC_IN_MIN) {
      newHistory = history
        .slice(0, history.length - 1)
        .concat({...tickerAdapter(newRawTick), date: lastTick.date, timestamp: lastTick.timestamp})
    } else {
      newHistory = history.concat(tickerAdapter(newRawTick))
    }

    return newHistory.length > HISTORY_LENGTH
      ? newHistory.slice(newHistory.length - HISTORY_LENGTH)
      : newHistory
  }
}