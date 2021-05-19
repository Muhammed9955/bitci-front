import React from 'react'
import cs from 'classnames'

import * as $ from './index.style'


const Dropdown = ({value, values, onChange, children, white, lightCyan, lg, noFilter, className, label}) => {
  const dropdownClass = cs('dropdown default-dropdown-item', $.dropdown, className, {
    [$.white]: white,
    [$.lightCyan]: lightCyan,
    [$.lg]: lg,
  })

  return (
    <label className={$.dropdownContainer}>
      {label && (
        <span className={$.label}>{label}:</span>
      )}
      <div className={dropdownClass}>
        <a className={$.btn} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className={$.value}>{value}</span>
          <span className="icon icon-triangle-down-gray"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdown">
          {children
            ? React.Children.map(children, (c) => React.cloneElement(c, {className: 'dropdown-item'}))
            : (noFilter ? values : values.filter((val) => val !== value))
              .map((val) => (
                <a key={val} onClick={onChange && (() => onChange(val))} className="dropdown-item">
                  {val}
                </a>
              ))
          }
        </div>
      </div>
    </label>
  )
}
export default Dropdown