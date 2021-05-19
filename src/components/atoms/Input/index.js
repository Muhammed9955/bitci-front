import React from 'react'
import cs from 'classnames'

import * as $ from './index.style'


const Input = ({sm, lg, green, red, dark, textCenter, className, before, after, ...props}) => {
  const inputClassName = cs(
    $.input,
    {
      [$.green]: green,
      [$.red]: red,
      [$.dark]: dark,
      [$.lg]: lg,
      [$.sm]: sm,
      [$.textCenter]: textCenter,
    },
    className,
  )

  return (
    <div className={inputClassName}>
      {before && <div className={$.before}>{before}</div>}
      <div className={$.inputContainer}>
        <input type="text" className={$.inputEl} {...props}/>
      </div>
      {after && <div className={$.after}>{after}</div>}
    </div>
  )
}

export default Input