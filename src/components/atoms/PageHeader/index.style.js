import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const side = css`
  font-size: 14px;
  font-weight: 200;
`

export const title = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 200;
`

export const pageHeader = css`
  position: relative;
  width: 100%;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.background};
  color: ${colors.white};
  padding: 0 15px;
`
