import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const btn = css({
  marginLeft: 10,
  paddingLeft: 0,
  paddingRight: 0,
  width: 50,
  height: 50,
})

export const qrImg = css({
  width: 22,
})

export const copyImg = css({
  width: 24,
})

export const inputContainer = css`
  flex: 1;
  
  input {
    width: 100%;
    padding-left: 15px;
  }
`

export const label = css`
  font-size: 12px;
  color: ${colors.lightGray};
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 3 3;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 14px;
    justify-content: flex-start;
  }
`

export const info = css`
  flex: 8 8;
  display: flex;
  margin-left: 30px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-left: 0;
  }
`

export const line = css`
  display: flex;
  padding: 0 15px;
  
  &:not(:first-child) {
    margin-top: 10px;
  }
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    flex-direction: column;
  }
`

export const side = css`
  flex: 1 1 50%;
`

export const depositMenu = css`
  display: flex;
  
  @media(max-width: ${breakPoints.mobile.max}px) {
    flex-direction: column;
  }
`
