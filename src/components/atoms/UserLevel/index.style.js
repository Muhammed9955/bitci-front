import {css} from 'react-emotion'

import theme from 'theme'


const {breakPoints} = theme

export const balls = css`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-left: 4px;
  }
`

export const userLevel = css`
  display: flex;
  flex-direction: column;
  width: 44px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    flex-direction: row;
    width: auto;
    align-items: center;
  }
`
