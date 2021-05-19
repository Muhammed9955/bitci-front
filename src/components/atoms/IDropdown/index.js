import React from 'react'
import cs from 'classnames'

import Input from 'components/atoms/Input'

import * as $ from './index.style'


const IDropdown = ({value, values, onChange, children, className, ...props}) => {
  const dropdownClass = cs('dropdown default-dropdown-item', $.dropDown, className)

  const after = (
    <div className={$.afterContainer}>
      <span className="icon icon-triangle-down-gray"/>
    </div>
  )

  return (
    <div className={dropdownClass}>
      <div className={$.inner} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <Input className={$.input} value={value} after={after} readOnly {...props}/>
      </div>
      <div className="dropdown-menu" aria-labelledby="dropdown">
        {children
          ? React.Children.map(children, (c) => React.cloneElement(c, {className: 'dropdown-item'}))
          : values.filter((val) => val !== value).map((val) => (
            <a key={val} onClick={onChange && (() => onChange(val))} className="dropdown-item">
              {val}
            </a>
          ))}
      </div>
    </div>
  )
}

export default IDropdown