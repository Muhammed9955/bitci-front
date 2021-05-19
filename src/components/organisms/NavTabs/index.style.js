import {css} from 'react-emotion'

import theme from 'theme'


export const navTabs = css`
  margin-bottom: 0;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    border-top: 1px solid ${theme.colors.cyan};
  }
`

export const inner = css`
  display: flex;
`

export const tab = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 14px;
  font-weight: 300;
  padding: 32px 22px 17px 22px;
  align-items: center;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    flex: 1;
    padding: 7px 5px;
    
    span {
      font-weight: 600;
      line-height: 19px;
    }
  }
  
  span {
    color: ${theme.colors.white};
    line-height: 21px;
  }
  
  &:hover span {
    color: ${theme.colors.lightCyan};
  }
`

export const tabActive = css`
  background: ${theme.colors.darkCyan};
  
  span {
    color: ${theme.colors.lightCyan};
  }
  
  @media (min-width: ${theme.breakPoints.desktop.min}px) {
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      height: 1px;
      left: 0;
      right: 0;
      background: ${theme.colors.lightCyan};
    }
  }
`

export const ico = css`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
`
