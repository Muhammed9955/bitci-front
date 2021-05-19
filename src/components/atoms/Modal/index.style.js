import {css} from 'react-emotion'

import theme from 'theme'


export const modal = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  outline: 0;
`

export const inner = css`
  background: ${theme.colors.dark};
  border: 5px solid ${theme.colors.gray};
`

export const sm = css`
  max-height: 50vh;
  max-width: 300px;
`

export const md = css`
  max-height: 75vh;
  width: 600px;
`

export const lg = css`
  max-height: 85vh;
  min-width: ${theme.breakPoints.desktop.min}px;
`

export const fs = css`
  width: 100vw;
  height: 100vh;
`

export const padded = css`
  padding: 15px;
`

export const modalRoot = css`
  width: 0;
  height: 0;
`