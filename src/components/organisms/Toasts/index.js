import React from 'react'

import Toast from 'components/atoms/Toast'
import {connectToasts} from 'utils/toasts'

import * as $ from './index.style'


const Toasts = ({toasts, closeToast}) => (
  <div className={$.toasts}>
    {toasts.reverse().map(({id, text, type}) => (
      <Toast key={id} text={text} type={type} onClose={() => closeToast(id)}/>
    ))}
  </div>
)

const mapToastsToProps = (toasts) => ({toasts})

const mapMethodsToProps = (toasts) => ({closeToast: (id) => toasts.del(id)})

export default connectToasts(mapToastsToProps, mapMethodsToProps)(Toasts)