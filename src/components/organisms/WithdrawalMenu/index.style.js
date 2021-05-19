import {css} from 'react-emotion'

import theme from 'theme'


const {breakPoints, colors} = theme

export const withdrawalTip = css`
  align-self: center;
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.white};
  
  @media(min-width: ${breakPoints.desktop.min}px) {
    padding-left: 100px;
    font-size: 10px;
  }
`

export const itemsText = css(`
  font-size: 14px;
  font-weight: 200;
  color: ${colors.lightGray};
  white-space: nowrap;
`)

export const itemsContainer = css`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;
`

export const amountVariants = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
  margin-top: 5px;
  
  li a {
    color: ${colors.lightGray};
    font-weight: 600;
    font-size: 12px;
    text-decoration: underline !important;
  }
  
  li:not(:first-child) {
    margin-left: 13px;
  }
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-bottom: -15px;
  }
`

export const dangerTip = css({
  fontSize: 10,
  padding: '0 5px 5px 0',
})

export const submitBtn = css`
  margin-left: 10px;
  padding-left: 60px;
  padding-right: 60px;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-left: 0;
  }
`

export const feeInput = css({
  boxShadow: 'none !important',
})

export const withdrawalAddrDropdown = css({
  padding: '7px 10px',
})

export const inputContainer = css`
  flex: 1;
  
  input {
    width: 100%;
    padding-left: 15px;
  }
`

export const info = css`
  flex: 8 8;
  margin-left: 30px;
  display: flex;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-left: 0;
    flex-direction: column;
    
    & > *:not(:first-child) {
      margin-top: 10px;
    }
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

export const line = css`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    flex-direction: column;
  }
  
  &:not(:first-child) {
    margin-top: 10px;
  }
`

export const side = css`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:first-child {
    flex-basis: 55%;
  }
  
  &:last-child {
    flex-basis: 45%;
  }
  
  @media(max-width: ${breakPoints.mobile.max}px) {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`

export const withdrawalMenu = css`
  display: flex;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    flex-direction: column;
  }
  
  @media (min-width: ${breakPoints.desktop.min}px) {
    padding: 10px 0;
  }
`
