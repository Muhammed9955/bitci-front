const HISTORY_SIZE = 50

export default () => (currHistory, history) => {
  return history.reverse().concat(currHistory).slice(0, HISTORY_SIZE)
}