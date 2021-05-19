import React from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import backIco from 'img/dashboard-icons/slim-arrow.svg'

import * as $ from './index.style'


const Overlay = ({title, onClose, children, header}) => {
  return (
    <div className={$.overlay}>
      {header || (
        <div className={$.header}>
          <div className={$.back} onClick={onClose}>
            <img src={backIco}/>
          </div>
          <div className={$.title}>
            {title}
          </div>
        </div>
      )}
      <div className={$.inner}>
        {children}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch, {onClose}) => ({
  onClose: onClose || (() => dispatch(goBack()))
})

export default connect(null, mapDispatchToProps)(Overlay)