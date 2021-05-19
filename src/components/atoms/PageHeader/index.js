import React from 'react'

import * as $ from './index.style'


const PageHeader = ({title, left, right}) => {
  return (
    <div className={$.pageHeader}>
      <div className={$.side}>{left || '\xa0'}</div>
      <div className={$.title}>{title || '\xa0'}</div>
      <div>{right || '\xa0'}</div>
    </div>
  )
}

export default PageHeader