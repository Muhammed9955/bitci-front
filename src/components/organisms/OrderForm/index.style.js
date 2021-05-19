import {css} from 'react-emotion'

import theme from 'theme'


export const minimalTip = css`
  color: ${theme.colors.gray};
  font-size: 10px;
  font-weight: 200;
  text-align: right;
  margin-right: -15px;  
`

export const sizes = css`
  display: flex;
  justify-content: space-between;
  
  span {
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.gray};
    text-decoration: underline;
  }
`

export const equivalent = css`
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.gray};
`

export const available = css`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.gray};
  
  span:last-child {
    color: ${theme.colors.white};
    font-weight: 600;
  }
`

export const inner = css`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    & > * {
      margin-top: 5px;
    }
  }
`

export const orderForm = css`
`