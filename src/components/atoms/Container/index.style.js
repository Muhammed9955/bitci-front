import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const header = css`
  border-bottom: 1px solid ${colors.darkCyan};
  font-size: 16px;
  font-weight: 300;
  color: ${colors.white};
  padding: 0 10px;
  min-height: 45px;
  display: flex;
  align-items: center;
`

export const complexHeader = css`
  align-items: stretch;
`

export const inner = css`
  padding: 0 7px;
`

export const container = css`
  background: ${colors.dark};
`
