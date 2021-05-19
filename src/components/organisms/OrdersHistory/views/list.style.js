import {css} from 'react-emotion'

import theme from 'theme'


export const summaryPrice = css`
  font-weight: 200;
`

export const summary = css`
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: 600;
`

export const filled = css`
  width: 24px;
  height: 24px;
`

export const price = css`
  margin-left: 30px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  
  small {
    font-size: 14px;
    font-weight: 400;
  }
`

export const pair = css`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.white};
`

export const side = css`
  font-size: 12px;
  font-weight: 600;
  margin-left: 15px;
`

export const date = css`
  font-size: 12px;
  font-weight: 400;
`

export const line = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const orderGreen = css`
  border-left-color: ${theme.colors.green};
  background: ${theme.colors.darkGreen};
  
  .${side} {
    color: ${theme.colors.green};
  }
`

export const orderRed = css`
  border-left-color: ${theme.colors.red};
  background: ${theme.colors.darkRed};
  
  .${side} {
    color: ${theme.colors.red};
  }
`

export const order = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 170px;
  margin-top: 15px;
  margin-right: 10px;
  border-left-width: 2px;
  border-left-style: solid;
  color: ${theme.colors.gray};
  padding: 15px;
  
  &:last-child {
    margin-bottom: 15px;
  }
`

export const list = css`
`
