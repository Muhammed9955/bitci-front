import React from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import styled from 'react-emotion'
import {getTranslate} from 'react-localize-redux'

import MiniPanel from 'components/atoms/MiniPanel'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import f2aSvg from 'img/dashboard-icons/f2a.svg'
import {updF2ASecret, sendF2AOtp, setSendF2AOtpResult} from 'store/state/app/actions'

import * as $ from './index.style'


const ResultMessage = styled.div`
  color: ${({success, theme}) => success ? theme.colors.green : theme.colors.red};
  font-size: 14px;
`

class AccountTwoFactor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      changeMode: false,
      otp: '',
    }
  }

  componentDidMount() {
    const {clearF2AEnableResult} = this.props

    clearF2AEnableResult()
  }

  render() {
    const {l} = this.props
    const {changeMode} = this.state
    const content = changeMode ? this._changeModeRender() : this._normalModeRender()

    return (
      <MiniPanel label={l('title')}>
        {content}
      </MiniPanel>
    )
  }

  _normalModeRender = () => {
    const {f2aEnabled, l} = this.props

    const btn = f2aEnabled
      ? <Button gray onClick={this._onDisableClick}>{l('btn.disable')}</Button>
      : <Button lightCyan onClick={this._onEnableClick}>{l('btn.enable')}</Button>

    return (
      <div className={$.accountTwoFactor}>
        <div className={$.left}>
          <div className={$.info}>
            <div className={$.infoLeft}>
              <img src={f2aSvg} className={$.icon} alt=""/>
            </div>
            <div className={$.infoRight}>
              <span className={$.title}>{l('title')}</span>
              <span className={$.description}>{l('desc')}</span>
            </div>
          </div>
        </div>
        <div className={$.right}>
          {btn}
        </div>
      </div>
    )
  }

  _changeModeRender = () => {
    const {f2aEnabled} = this.props

    return f2aEnabled ? this._disableRender() : this._enableRender()
  }

  _enableRender = () => {
    const {qr, sendOtp, f2aEnableResult, l} = this.props
    const {otp} = this.state

    return (
      <div className={$.accountTwoFactor}>
        <div className={$.left}>
          <img src={qr} className={$.qr} alt=""/>
        </div>
        <div className={$.rightChangeMode}>
          {f2aEnableResult && (
            <ResultMessage success={f2aEnableResult.otpset}>
              {f2aEnableResult.otpset ? l('success') : f2aEnableResult.message}
            </ResultMessage>
          )}
          <Input placeholder={l('typeCode')} value={otp} onChange={this._onOtpChange} lg/>
          <Button lightCyan onClick={() => sendOtp(otp)}>{l('btn.enable')}</Button>
        </div>
      </div>
    )
  }

  _disableRender = () => {
    const {l} = this.props
    const {otp} = this.state

    return (
      <div className={$.accountTwoFactor}>
        <div className={$.disableMode}>
          <Input placeholder={l('typeCode')} value={otp} onChange={this._onOtpChange}/>
          <Button lightCyan>{l('btn.disable')}</Button>
        </div>
      </div>
    )
  }

  _onEnableClick = () => {
    const {updSecret} = this.props

    updSecret()
    this._toggleMode()
  }

  _onDisableClick = () => {
    this._toggleMode()
  }

  _toggleMode = () => {
    this.setState(({changeMode}) => ({
      changeMode: !changeMode
    }))
  }

  _onOtpChange = ({target}) => {
    this.setState({
      otp: target.value
    })
  }
}
const mapStateToProps = ({app, locale}) => ({
  f2aEnabled: app.user.f2a,
  qr: get(app, 'f2aSecret.qr', null),
  f2aEnableResult: app.sendF2AOtpResult,
  l: (key) => getTranslate(locale)('twoFactorPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  updSecret: () => dispatch(updF2ASecret()),
  sendOtp: (otp) => dispatch(sendF2AOtp(otp)),
  clearF2AEnableResult: () => dispatch(setSendF2AOtpResult(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountTwoFactor)