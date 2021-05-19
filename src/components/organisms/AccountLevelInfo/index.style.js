import {css, cx} from 'react-emotion'

import theme from 'theme'


export const accountLevelInfo = css`
  padding: 20px 18px;
`

export const levels = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 13px;
`

export const links = css`
  margin-top: 12px;
  text-align: right;
  
  & > *:not(:first-child) {
    margin-left: 76px;
  }
`

export const stripe = css`
  height: 2px;
  background: ${theme.colors.gray};
  flex: 1;
  margin: 0 22px;
`

export const lvlInfoContainer = css`
  width: 41px;
  margin-top: 13px;
  align-self: flex-start;
`

export const lvlInfoTitle = css`
  font-size: 14px;
  font-weight: 200;
  color: ${theme.colors.white};
  white-space: nowrap;
  line-height: 16px;
  margin-top: 7px;
`

export const lvlInfoTitleLast = cx(lvlInfoTitle, css`
  position: relative;
  left: -23px;
`)

export const lvlInfoValue = css`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.white};
  white-space: nowrap;
  line-height: 16px;
  margin-top: 2px;
`