import React from 'react'
import styled from 'react-emotion'


const Badge = styled.div`
  padding: 3px 16px;
  line-height: 19px;
  border-color: ${({theme}) => theme.colors.darkGray};
  border-radius: 3px;
  border-width: 3px;
  background: ${({theme, lightCyan}) => lightCyan ? theme.colors.lightCyan : theme.colors.gray};
  color: ${({theme}) => theme.colors.white};
  font-size: 12px;
  height: 25px;
  
  @media (max-width: ${({theme}) => theme.breakPoints.mobile.max}px) {
    padding: 3px 8px;
    font-size: 10px;
    height: 20px;
    line-height: 14px;
  }
`

export default Badge