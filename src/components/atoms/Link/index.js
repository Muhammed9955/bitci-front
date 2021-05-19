import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import styled, {cx} from 'react-emotion'

import * as $ from './index.style'

const L = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: ${({color = 'white', theme}) => theme.colors[color]} !important;
`

const Link = ({sm, lg, underline, children, blank, className = '', ...props}) => {
  const newClassName = cx(
    className,
    sm && $.sm,
    lg && $.lg,
    underline && $.underline
  )

  const additionalProps = {
    target: blank ? '_blank' : ''
  }

  return <L className={newClassName} {...props} {...additionalProps}>{children}</L>
}

const mapDispatchToProps = (dispatch, {to, onClick}) => {
  if(!to) return {}

  const combinedOnClick = () => {
    dispatch(push(to))
    onClick && onClick()
  }

  return {
    onClick: combinedOnClick
  }
}

export default connect(null, mapDispatchToProps)(Link)