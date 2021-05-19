import React from 'react'
import {cx} from 'react-emotion'

import * as $ from './index.style'


const Toast = ({label, text, type, onClose}) => (
  <div className={cx($.toast, $[type])}>
    <span className={$.close} onClick={onClose}/>
    <div className={$.text}>{text}</div>
  </div>
)

export default Toast