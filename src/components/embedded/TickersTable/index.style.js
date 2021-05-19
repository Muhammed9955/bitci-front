import {css} from 'react-emotion'
import {cx} from 'emotion'

import theme from 'theme'


const {colors} = theme

export const arrow = css`
  height: 5px;
  width: 5px;
  border: 5px solid transparent;
  display: inline-block;
  margin-right: 7px;
`

export const up = css`
  border-bottom: 5px solid ${theme.colors.green};
  vertical-align: baseline;
`

export const down = css`
  border-top: 5px solid ${theme.colors.red};
  vertical-align: middle;
`

export const green = css`
  color: ${colors.green};
`

export const red = css`
  color: ${colors.red};
`

export const cellTxt = css`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const pairCellTxt = css`
  font-size: 14px;
  color: ${colors.gray};
`

export const headerTxt = css`
  font-sie: 14px;
  font-weight: 600;
  color: ${colors.gray};
  text-align: left;
`

export const tableContainer = css`
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
`

export const header = css`
  background: ${colors.background};
  display: flex;
  justify-content: center;
`

export const tickersTable = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`