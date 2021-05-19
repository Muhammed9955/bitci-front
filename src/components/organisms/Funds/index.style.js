import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

const SUBMENU_HEIGHT = 0

export const currency = css`
  font-size: 16px;
  font-weight: 600;
`

export const line = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 400;
  background: ${colors.background};
  flex: 0 0 42px;

  &:not(:first-child) {
    margin-top: 5px;
  }
`

export const btn = css`
  flex: 1 1;
  
  &:not(:first-child) {
    margin-left: 5px;
  }
`

export const title = css`
  color: ${colors.gray};
  font-size: 16px;
  font-weight: 600;
`

export const btc = css`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
`

export const dollars = css`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.white};
`

export const estimated = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  padding: 25px 0 5px;
`

export const showAllBalances = css`
  display: flex;
  align-items: center;
  
  img {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
`

export const actions = css`
  display: flex;
  padding: 10px 25px;
  flex-shrink: 0;
`

export const lines = css`
  display: flex;
  flex-direction: column;
  padding: 10px 0 ${SUBMENU_HEIGHT + 10}px;
  flex-shrink: 0;
`

export const subMenu = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 65px;
  background: ${colors.dark};
  height: ${SUBMENU_HEIGHT}px;
  display: flex;
  align-items: center;
  padding: 0 15px;
`

export const funds = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`