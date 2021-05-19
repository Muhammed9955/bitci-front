import {css} from 'react-emotion'

import theme from 'theme'


export const inputEl = css`
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${theme.colors.white};
  padding: 0 15px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

export const inputContainer = css`
  flex: 1;
`

export const before = css`
  flex: 0 0;
`

export const after = css`
  flex: 0 0;
`

export const textCenter = css`
  text-align: center;

  &::placeholder {
    text-align: center;
  }
`

export const input = css`
  display: flex;
  height: 35px;
  background: ${theme.colors.cyan};
  border-bottom: 1px solid ${theme.colors.gray};
  font-size: 14px;
  line-height: 20px;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    margin: 0;
  }
`

export const lg = css`
  height: 50px;
`

export const sm = css`
  height: 24px;
  
  .${inputEl} {
    padding: 0 5px;
  }
`

export const green = css`
  background: ${theme.colors.darkGreen};
`

export const red = css`
  background: ${theme.colors.darkRed};
`

export const dark = css`
  background: ${theme.colors.dark};
`
