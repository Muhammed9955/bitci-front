import {padLeadZero} from 'utils/numbers'


export const formatDate = (date, withYear) => {
  const day = padLeadZero(date.getDate())
  const month = padLeadZero(date.getMonth() + 1)
  const hours = padLeadZero(date.getHours())
  const minutes = padLeadZero(date.getMinutes())
  const seconds = padLeadZero(date.getSeconds())

  const withoutYear = `${month}-${day} ${hours}:${minutes}:${seconds}`

  if (withYear) return `${date.getFullYear()}-${withoutYear}`

  return withoutYear
}
