import React from 'react'
import QRious from 'qrious'

import * as $ from './index.style'


class QRCode extends React.PureComponent {
  constructor(props) {
    super(props)

    this._canvas = null
    this._qr = null
  }

  componentDidMount() {
    this._renderQR()
  }

  componentDidUpdate() {
    this._renderQR()
  }

  render() {
    return (
      <div className={$.qrCode}>
        <canvas ref={(el) => this._canvas = el}/>
      </div>
    )
  }

  _renderQR = () => {
    const {value, size = 200, level = 'H'} = this.props

    this._qr = new QRious({
      size,
      value,
      level,
      element: this._canvas,
    })
  }
}

export default QRCode