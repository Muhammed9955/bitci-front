import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const actions = css`
  flex: 100 0;
`

export const addressTxid = css`
  flex: 477 1;
  font-size: 12px;
  color: ${colors.gray};
  display: flex;
  flex-direction: column;  
`

export const amount = css`
  flex: 100 0;
`

export const currency = css`
  flex: 100 0;
`

export const statusDate = css`
  flex: 150 0;
  display: flex;
  flex-direction: column;
  
  & > *:last-child {
    font-size: 12px;
  }
`

export const icoContainer = css`
  flex-basis: 24px;
  
  img {
    width: 100%;
  }
`

export const line = css`
  min-height: 84px;
  display: flex;
  align-items: center;
  background: ${colors.darkCyan};
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  padding: 0 15px;
  
  & > *:not(:first-child) {
    margin-left: 14px;
  }
`

export const lines = css`
  display: flex;
  flex-direction: column;
  margin: 0 -3px;
`

export const stripe = css`
  height: 1px;
  width: 200px;
  background: ${colors.darkCyan};
  margin: 0 15px;
`

export const noMore = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.gray};
  font-size: 12px;
  font-weight: 600;
  margin-top: 15px;
`

export const title = css`
`

export const exportHistory = css`
  align-self: flex-end;
  
  img {
    width: 24px;
    vertical-align: bottom;
    margin: 0 5px;
  }
`

export const header = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
  min-height: 55px;
`

export const transactionsHistory = css`
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
`