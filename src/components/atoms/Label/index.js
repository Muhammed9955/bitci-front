import React from 'react'

import * as $ from './index.style'


const Label = ({value}) => {
  return (
    <span className={$.label}>{value}</span>
  )
}

export default Label
