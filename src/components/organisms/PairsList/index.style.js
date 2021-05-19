import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const headerColumn = css`
  flex: 3 3;
  
  &:last-child {
    flex: 2 2;
    text-align: right;
  }
`

export const lineColumn = css`
  flex: 3 3;
  display: flex;
  flex-direction: column;
  
  &:last-child {
    flex: 2 2;
    align-items: flex-end;
  }
`

export const lineWhiteText = css`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
`

export const lineRedText = css`
  color: ${colors.red};
  font-size: 14px;
  font-weight: 600;
`

export const lineGreenText = css`
  color: ${colors.green};
  font-size: 14px;
  font-weight: 600;
`

export const changeInfo = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 35px;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.white};
  border: 1px solid ${colors.gray};
  background: ${colors.lightCyan};
`

export const changeInfoGreen = css`
  background: ${colors.green};
`

export const changeInfoRed = css`
  background: ${colors.red};
`

export const line = css`
  display: flex;
  margin-top: 10px;
`

export const header = css`
  display: flex;
  font-size: 14px;
  font-weight: 400;
`

export const body = css`
  font-size: 12px;
  font-weight: 400;
`

export const pairsList = css`
  padding: 8px 15px;
  color: ${theme.colors.gray};
`