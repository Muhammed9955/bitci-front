import {css} from 'react-emotion'

import theme from 'theme'


export const title = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 200;
  color: ${theme.colors.white};
  z-index: 1;
`

export const back = css`
  cursor: pointer;
  padding: 4px;

  img {
    width: 16px;
    height: 16px;
  }
`

export const inner = css`
  flex: 1;
  overflow: auto;
`

export const header = css`
  position: relative;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.darkCyan};
  padding: 10px 15px;
`

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.dark};
  display: flex;
  flex-direction: column;
  z-index: 1;
`
