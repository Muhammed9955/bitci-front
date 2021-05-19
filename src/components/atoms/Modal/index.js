import React from 'react'
import ReactDOM from 'react-dom'
import {cx} from 'react-emotion'

import * as $ from './index.style'


const MODAL_ROOT_ID = 'modal-root'

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this._container = document.createElement('div')
    this._fadeContainer = null
  }

  componentDidMount() {
    document.getElementById(MODAL_ROOT_ID).appendChild(this._container)
  }

  componentWillUnmount() {
    document.getElementById(MODAL_ROOT_ID).removeChild(this._container)
  }

  render() {
    const {children, lg, md, sm, fs, padded} = this.props

    const innerClassName = cx($.inner,
      {[$.sm]: sm},
      {[$.md]: md},
      {[$.lg]: lg},
      {[$.fs]: fs},
      {[$.padded]: padded},
    )

    const modal = (
      <div className={$.modal} ref={(el) => (this._fadeContainer = el)} onClick={this._checkOnClose}>
        <div className={innerClassName}>
          {children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(modal, this._container)
  }

  _checkOnClose = ({target}) => {
    const {onClose} = this.props

    if (target === this._fadeContainer) {
      onClose && onClose()
    }
  }
}

export default Modal


export const ModalRoot = () => (
  <div className={$.modalRoot} id={MODAL_ROOT_ID}/>
)
