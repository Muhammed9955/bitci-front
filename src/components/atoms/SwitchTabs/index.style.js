import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const dark = css`
  background: ${colors.dark};
`

export const border = css`
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${colors.cyan};
  }
`

export const switchTabs = css`
  position: relative;
  background: ${colors.background};
`

export const inner = css`
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  
  @media(max-width: ${breakPoints.mobile.max}px) {
    justify-content: space-between;
  }
`

export const tab = css`
  color: ${colors.white};
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  font-size: 14px;
  font-weight: 200;
  
  &:not(:last-child) {
    margin-right: 25px;
  }
  
  @media(max-width: ${breakPoints.mobile.max}px) {
    padding-top: 2px;
  }
`

export const activeTab = css`
  color: ${colors.lightCyan};
  border-bottom-color: ${colors.lightCyan};
`