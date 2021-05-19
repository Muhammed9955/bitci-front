import {css} from 'react-emotion'

import theme from 'theme'


export const LINE_HEIGHT = 23

export const tradeHistory = css`
  flex: 208 208 207px;
  display: flex;
  flex-direction: column;
`

export const table = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`

export const head = css`
  flex: 1;
  font-size: 12px;
  color: ${theme.colors.gray};
`

export const header = css`
  display: flex;
  padding-bottom: 5px;
  
  .${head}:nth-child(3) {
    text-align: right;
  }
`

export const lines = css`
  flex: 1 1 0;
  overflow: hidden;
`

export const column = css`
  flex: 1;
`

export const line = css`
  cursor: pointer;
  display: flex;
  font-size: 10px;
  font-weight: 600;
  color: ${theme.colors.white};
  height: ${LINE_HEIGHT}px;
  line-height: ${LINE_HEIGHT}px;
  
  & > *:last-child {
    text-align: right;
  }
`

export const green = css`
  color: ${theme.colors.green};
`

export const red = css`
  color: ${theme.colors.red};
`

export const gray = css`
  color: ${theme.colors.gray};
`

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
