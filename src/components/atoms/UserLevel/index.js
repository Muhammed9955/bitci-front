import React from 'react'
import styled from 'react-emotion'

import * as $ from './index.style'


const Ball = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({theme, active}) => active ? theme.colors.lightCyan : theme.colors.gray};
  
  @media (max-width: ${({theme}) => theme.breakPoints.mobile.max}px) {
    width: 12px;
    height: 12px;
  }
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme, whiteTitle}) => whiteTitle ? theme.colors.white : theme.colors.lightCyan};
  
  @media (max-width: ${({theme}) => theme.breakPoints.mobile.max}px) {
    font-size: 12px;
  }
`

const UserLevel = ({level, whiteTitle, label}) => (
  <div className={$.userLevel}>
    <Title whiteTitle={whiteTitle}>
      {label} {level}
    </Title>
    <div className={$.balls}>
      <Ball active={level >= 1}/>
      <Ball active={level >= 2}/>
      <Ball active={level >= 3}/>
    </div>
  </div>
)

export default UserLevel