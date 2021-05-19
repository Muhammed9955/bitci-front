import React from 'react'

import * as $ from './index.style'


const MiniPanel = ({label, children}) => (
  <div className={$.miniPanel}>
    <div className={$.label}>{label}</div>
    <div className={$.panel}>{children}</div>
  </div>
)

export default MiniPanel