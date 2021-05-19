import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import get from 'lodash/get'

import Modal from 'components/atoms/Modal'
import QRCode from 'components/atoms/QRCode'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import {copyToClipboard} from 'store/state/app/actions'
import copySvg from 'img/dashboard-icons/copy.svg'
import qrSvg from 'img/dashboard-icons/qr.svg'

import * as $ from './index.style'


class DepositMenu extends React.Component {
  state = {
    showQR: false,
  }

  render() {
    const {currency, depositAddress, depositTag, l} = this.props
    const {showQR} = this.state

    return (
      <div className={$.depositMenu}>
        <div className={$.side}>
          <div className={$.line}>
            <span className={$.label}>
              {l('depositAddress', {currency})}
            </span>
            <div className={$.info}>
              <div className={$.inputContainer}>
                <Input lg readOnly value={depositAddress}/>
              </div>
              <Button className={$.btn} lightCyan onClick={this._copyAddress} disabled={!depositAddress}>
                <img src={copySvg} className={$.copyImg} alt=""/>
              </Button>
              <Button className={$.btn} lightCyan onClick={this._toggleShowQR} disabled={!depositAddress}>
                <img src={qrSvg} className={$.qrImg} alt=""/>
              </Button>
            </div>
          </div>
          {depositTag && (
            <div className={$.line}>
              <span className={$.label}>
                {l('depositTag')}
              </span>
              <div className={$.info}>
                <div className={$.inputContainer}>
                  <Input lg readOnly value={depositTag}/>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={$.side}>
          {/*<div className="row justify-content-center">*/}
            {/*<div className="col-xs-2 col-md-2 text-right">*/}
              {/*{l('depositTip.title')}:*/}
            {/*</div>*/}
            {/*<div className="col-xs-8 col-md-8">*/}
              {/*{l('depositTip.desc')}*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
        {showQR && <Modal sm onClose={this._toggleShowQR}><QRCode value={depositAddress}/></Modal>}
      </div>
    )
  }

  _copyAddress = () => {
    const {copyToClipboard, depositAddress} = this.props

    copyToClipboard(depositAddress)
  }

  _toggleShowQR = () => {
    this.setState(({showQR}) => ({showQR: !showQR}))
  }
}

const mapStateToProps = ({app, locale}, {currency}) => {
  const {address = '', tag = null} = get(app, `walletInfo.${currency}`, {})

  return {
    depositAddress: address,
    depositTag: tag,
    l: (key, params) => getTranslate(locale)('withdrawalsPanel.menu.' + key, params),
  }
}

const mapDispatchToProps = (dispatch) => ({
  copyToClipboard: (text) => dispatch(copyToClipboard(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositMenu)