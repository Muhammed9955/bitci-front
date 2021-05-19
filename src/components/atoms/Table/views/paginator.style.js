import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const paginator = css`
  display: flex;
  padding: 28px 5px 14px;
  margin: 0;
  justify-content: flex-end;
`

export const btn = css`
  color: ${colors.gray};
  font-size: 12px
  font-weight: 400;
  line-height: 17px;
  padding: 3px 10px;
  border: 1px solid ${colors.gray};
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: ${colors.white};
    background: ${colors.lightCyan};
    border-color: ${colors.lightCyan};
    transition: background .3s;
  }
`

export const prevBtn = css`
  margin-right: 10px;
`

export const nextBtn = css`
  margin-left: 10px;
`

export const active = css`
  .${btn} {
    color: ${colors.white};
    background: ${colors.lightCyan};
    border-color: ${colors.lightCyan};
  }
`

export const disabled = css`
  opacity: .5;
  pointer-events: none;
`

export const page = css`
  margin: 0 5px;
  color: ${colors.gray};
  user-select: none;
`