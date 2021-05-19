import {css} from 'react-emotion'

import theme from 'theme'


export const toast = css`
  width: 250px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 10px 30px 10px 10px;
  margin-bottom: 15px;
  position: relative;
`

export const close = css`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 5px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: white;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`

export const info = css`
  color: ${theme.colors.white};
  border-color: ${theme.colors.lightCyan};
  background: ${theme.colors.cyan};
  
  .${close}::before, .${close}::after {
    background: ${theme.colors.lightCyan};
  }
`

export const success = css`
  color: ${theme.colors.green};
  border-color: ${theme.colors.green};
  background: ${theme.colors.darkGreen};
  
  .${close}::before, .${close}::after {
    background: ${theme.colors.green};
  }
`

export const error = css`
  color: ${theme.colors.red};
  border-color: ${theme.colors.red};
  background: ${theme.colors.darkRed};
  
  .${close}::before, .${close}::after {
    background: ${theme.colors.red};
  }
`

export const text = css`
  font-size: 12px;
  font-weight: 400;
`
