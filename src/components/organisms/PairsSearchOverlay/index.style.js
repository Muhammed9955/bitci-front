import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const searchIcoContainer = css`
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 100%;
  
  img {
    height: 16px;
    width: 16px;
  }
`

export const cancelContainer = css`
  padding-right: 10px;
  display: flex;
  align-items: center;
  height: 100%;
`

export const tip = css`
  color: ${colors.lightGray};
  font-size: 12px;
  font-weight: 600;
  padding: 0 15px;
  margin-top: 10px;
`

export const header = css`
  display: flex;
  flex-direction: column;
`
