import {css} from 'react-emotion'

import theme from 'theme'


export const accountTwoFactor = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const left = css`
`

export const right = css`
`

export const icon = css`
  width: 31px;
  margin-top: 7px;
`

export const info = css`
  display: flex;
`

export const infoLeft = css`
  padding-right: 5px;
`

export const infoRight = css`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
`

export const title = css`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: ${theme.colors.white};
`

export const description = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.colors.white};
  margin-top: 10px;
`

export const qr = css`
  width: 200px;
  height: 200px;
  padding: 5px;
  background: white;
`

export const rightChangeMode = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 30px;
  align-self: flex-end;
  
  & > *:first-child {
    margin-top: 0;
  }
  
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`

export const disableMode = css`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  width: 100%;
  align-items: baseline;
  
  & > *:first-child {
    flex: 1;
    margin-right: 15px;
  } 
`