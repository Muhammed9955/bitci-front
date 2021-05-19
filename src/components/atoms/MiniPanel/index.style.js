import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const label = css`
  font-size: 18px;
  font-weight: 200;
  color: ${colors.white};
  line-height: 24px;
`

export const panel = css`
  @media (min-width: ${breakPoints.desktop.min}px) {
    background: ${colors.darkCyan};
    min-height: 132px;
    border-top: 1px solid ${colors.lightCyan};
    padding: 20px 30px;
    margin-top: 12px;
    display: flex;
    align-items: stretch;
  }
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    min-height: 50px;
    padding: 0 10px; 
    background: ${colors.background};
    margin-top: 5px;
    margin-left: 2px;
    display: flex;
    align-items: center;
  }
`

export const miniPanel = css`
  padding: 20px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    padding: 0;
  }
`
