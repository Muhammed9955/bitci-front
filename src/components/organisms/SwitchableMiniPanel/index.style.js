import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const title = css`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: ${colors.white};
`

export const desc = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.white};
  margin-top: 10px;
`

export const textContainer = css`
  padding: 0 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const icoContainer = css`
  margin-top: 7px;
`

export const actions = css`
`

export const info = css`
  flex: 1;
  display: flex;
`

export const switchableMiniPanel = css`
  display: flex;
  align-items: center;
  width: 100%;
`