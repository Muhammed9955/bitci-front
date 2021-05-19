import isEqual from 'lodash/isEqual'


export default () => (currData, newData) => {
  const {prev, current} = currData

  return {
    prev: isEqual(current, newData) ? prev : current,
    current: newData,
  }
}