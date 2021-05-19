import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const dropdown = css`
  line-height: 13px;
  display: inline-block;
`

export const value = css`
  color: ${colors.gray};
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-weight: 200;
    font-size: 13px;
  }
`

export const btn = css`
  cursor: pointer;
`

export const white = css`
  .${value} {
    color: ${colors.white};
  }
`

export const lightCyan = css`
  .${value} {
    color: ${colors.lightCyan};
  }
`

export const lg = css`
  .${value} {
    font-size: 18px;
  }
`

export const label = css`
  font-size: 12px;
  color: ${colors.gray};
  margin-right: 10px;
`

export const dropdownContainer = css`
  display: flex;
  margin: 0;
  align-items: center;
`