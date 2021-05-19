import React from 'react'
import cs from 'classnames'

import * as $ from './index.style'


const Container = ({children, header, headerRender, className}) => (
  <div className={cs($.container, className)}>
    {header && (
      <div className={$.header}>
        {header}
      </div>
    )}
    {headerRender && (
      <div className={cs($.header, $.complexHeader)}>
        {headerRender()}
      </div>
    )}
    <div className={$.inner}>
      {children}
    </div>
  </div>
)

export default Container
