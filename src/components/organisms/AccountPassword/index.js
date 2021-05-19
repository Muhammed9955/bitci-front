import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {getTranslate} from 'react-localize-redux'

import MiniPanel from 'components/atoms/MiniPanel'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import lockSvg from 'img/dashboard-icons/lock.svg'
import {changePassword, setChangePasswordResult} from 'store/state/app/actions'

import * as $ from './index.style'


const ResultMessage = styled.div`
  margin-bottom: 20px;
  color: ${({success, theme}) => success ? theme.colors.green : theme.colors.red};
  font-size: 14px;
`

class AccountPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      changeMode: false,
      currPass: '',
      newPass: '',
      newPassRepeat: '',
      submitEnabled: false,
    }
  }

  componentDidMount() {
    const {clearChangePasswordResult} = this.props

    clearChangePasswordResult()
  }

  render() {
    const {changeMode, submitEnabled, currPass, newPass, newPassRepeat} = this.state
    const {changePassword, changeResult, l} = this.props

    const leftContent = changeMode ? this._renderInputs() : this._renderInfo()

    const right = changeMode
      ? (
        <div className={$.rightExtended}>
          {changeResult && (
            <ResultMessage success={changeResult.changed}>
              {changeResult.changed ? l('changed') : changeResult.message}
            </ResultMessage>
          )}
          <Button lightCyan onClick={() => changePassword(currPass, newPass, newPassRepeat)} disabled={!submitEnabled}>
            {l('changePassword')}
          </Button>
        </div>
      )
      : (
        <div className={$.right}>
          <Button lightCyan onClick={this._toggleMode}>{l('btn.change')}</Button>
        </div>
      )

    return (
      <MiniPanel label={'Login password'}>
        <div className={$.accountPassword}>
          <div className={$.left}>
            {leftContent}
          </div>
          {right}
        </div>
      </MiniPanel>
    )
  }

  _renderInfo = () => {
    const {l} = this.props

    return (
      <div className={$.info}>
        <div className={$.infoLeft}>
          <img src={lockSvg} className={$.icon} alt=""/>
        </div>
        <div className={$.infoRight}>
          <span className={$.title}>{l('title')}</span>
          <span className={$.description}>{l('desc')}</span>
        </div>
      </div>
    )
  }

  _renderInputs = () => {
    const {l} = this.props
    const {currPass, newPass, newPassRepeat} = this.state

    return (
      <div className={$.inputs}>
        <Input value={currPass} onChange={({target}) => this._onInputChange('currPass', target.value)}
               placeholder={l('currPass')} type="password" lg/>
        <Input value={newPass} onChange={({target}) => this._onInputChange('newPass', target.value)}
               placeholder={l('newPass')} type="password" lg/>
        <Input value={newPassRepeat} onChange={({target}) => this._onInputChange('newPassRepeat', target.value)}
               placeholder={l('repeatNewPass')} type="password" lg/>
      </div>
    )
  }

  _validate = () => {
    const {currPass, newPass, newPassRepeat} = this.state

    return currPass && newPass && newPass === newPassRepeat
  }

  _onInputChange = (type, value) => {
    this.setState({
      [type]: value,
    }, () => {
      const {submitEnabled} = this.state
      const isValid = this._validate()

      if (submitEnabled !== isValid) {
        this.setState({
          submitEnabled: isValid,
        })
      }
    })
  }

  _toggleMode = () => {
    this.setState(({changeMode}) => ({
      changeMode: !changeMode,
    }))
  }
}

const mapStateToProps = ({app, locale}) => ({
  changeResult: app.changePasswordResult,
  l: (key) => getTranslate(locale)('loginPasswordPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  changePassword: (currPass, newPass, newPassRepeat) => dispatch(changePassword(currPass, newPass, newPassRepeat)),
  clearChangePasswordResult: () => dispatch(setChangePasswordResult(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPassword)
