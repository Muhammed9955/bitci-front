import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const copyTip = css`
  color: ${colors.white};
  font-size: 18px;
  padding: 15px;
`

export const accountUserInfo = css`
  display: flex;
  padding: 20px 0;
  flex-wrap: wrap;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    align-items: center;
    padding: 15px 0;
  }
`

export const left = css`
  padding: 0 18px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    padding: 0 15px;
  }
`

export const right = css`
  padding: 0 18px;
  flex: 1;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    padding: 0 15px 0 0;
  }
`

export const bottom = css`
  padding: 0 15px;
  flex-basis: 100%;
`

export const accountImg = css`
  width: 68px;
  margin-top: 15px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    width: 50px;
    margin: 0;
  }
`

export const infoLine = css`
  display: flex;
  align-items: flex-end;
  
  & > *:not(:first-child) {
    margin-left: 25px;
  }
  
  @media (min-width: ${breakPoints.desktop.min}px) {
    margin-bottom: 15px;
  }
`

export const email = css`
  font-size: 24px;
  color: ${colors.gray};
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.lightCyan};
  }
`

export const lastLoginInfo = css`
  color: ${colors.darkGray};
  font-size: 14px;
  font-weight: 600;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 10px;
    color: ${colors.gray};
  }
`

export const bnbTip = css`
  font-size: 18px;
  color: ${colors.white};
`

export const refCodeTip = css`
  font-size: 11px;
  font-weight: 200;
  white-space: nowrap;
`

export const refCode = css`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.lightCyan};
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 16px;
  }
`