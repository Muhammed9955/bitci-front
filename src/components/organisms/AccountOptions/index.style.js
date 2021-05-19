import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const activeText = css`
  color: ${colors.lightCyan};
`

export const disabledText = css`
  color: ${colors.gray};
`

export const ico = css`
  height: 24px;
`

export const tip = css`
  font-size: 18px;
  color: ${colors.white};
  
  @media (min-width: ${breakPoints.desktop.min}px) {
    margin-right: 25px;
  }
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 14px;
    font-weight: 400;
    flex: 1;
  }
  
  @media (max-width: 370px) {
    font-size: 12px;
  }
  
  @media (max-width: 330px) {
    font-size: 11px;
  }
`

export const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > *:not(:first-child) {
    margin-left: 8px;
  }
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    width: 100%;
  }
`