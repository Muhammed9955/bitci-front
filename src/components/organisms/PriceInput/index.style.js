import {css} from 'react-emotion'

import theme from 'theme'


const HEIGHT = 35

export const left = css`
  flex: 0 1;
  display: flex;
`

export const inputContainer = css`
  flex: 1 1;
`

export const input = css`
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 0 8px;
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    padding 0 5px;
  }
`

export const right = css`
  flex: 0 1;
  display: flex;
  align-items: center;
`

export const aloneBtn = css`
  height: ${HEIGHT}px;
  width: ${HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${theme.colors.darkGray};
  cursor: pointer;
`

export const aloneDecreaseBtn = css`
  &::before {
    content: '';
    border: ${HEIGHT / 4}px solid transparent;
    border-top-color: ${theme.colors.lightGray};
    border-bottom-width: 0;
  }
`

export const aloneIncreaseBtn = css`
  &::before {
    content: '';
    border: ${HEIGHT / 4}px solid transparent;
    border-bottom-color: ${theme.colors.lightGray};
    border-top-width: 0;
  }
`

export const currency = css`
  font-size: 14px;
  font-weight: 600;
  flex: 1 1;
  padding-right: 10px;
`

export const pairBtn = css`
  height: ${Math.ceil(HEIGHT / 2 - 4)}px;
  width: ${Math.ceil(HEIGHT / 2 - 4)}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${theme.colors.darkGray};
  cursor: pointer;
  
  &:first-child {
    margin-bottom: 2px;
  }
`

export const pairIncreaseBtn = css`
  &::before {
    content: '';
    border: ${HEIGHT / 7}px solid transparent;
    border-bottom-color: ${theme.colors.lightGray};
    border-top-width: 0;
  }
`

export const pairDecreaseBtn = css`
  &::before {
    content: '';
    border: ${HEIGHT / 7}px solid transparent;
    border-top-color: ${theme.colors.lightGray};
    border-bottom-width: 0;
  }
`

export const btns = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 3px;
`

export const priceInput = css`
  box-sizing: content-box;
  height: ${HEIGHT}px;
  display: flex;
  border-bottom: 1px solid ${theme.colors.gray};
  background: transparent;
  color: ${theme.colors.gray};
`

export const green = css`
  background: ${theme.colors.darkGreen};
  
  .${aloneIncreaseBtn}, .${pairBtn} {
    background: ${theme.colors.halfGreen};
  }
`

export const red = css`
  background: ${theme.colors.darkRed};
  
  .${aloneIncreaseBtn}, .${pairBtn} {
    background: ${theme.colors.halfRed};
  }
`