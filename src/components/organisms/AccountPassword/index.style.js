import {css} from 'react-emotion'

import theme from 'theme'


export const accountPassword = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const left = css`
  flex: 1;
  padding-right: 30px;
`

export const right = css`
`

export const rightExtended = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 50%;
`

export const icon = css`
  width: 24px;
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

export const inputs = css`
  display: flex;
  flex-direction: column;
  
  & > *:not(:first-child) {
    margin-top: 10px;
  }
`
