import React from 'react'
import cs from 'classnames'


const Button = ({children, sm, lg, lightCyan, green, red, gray, outline, active, className, ...props}) => {
  const btnClassName = cs('btn', {
    'btn-sm': sm,
    'btn-lg': lg,
    'btn-info': lightCyan,
    'btn-success': green,
    'btn-danger': red,
    'btn-outline-secondary': gray,
    'btn-outline-info': outline && lightCyan,
    'active': active,
  }, className)

  return (
    <button type="button" {...props} className={btnClassName}>
      {children}
    </button>
  )
}

export default Button
