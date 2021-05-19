import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Button from 'components/atoms/Button'
import SwitchableMiniPanel from 'components/organisms/SwitchableMiniPanel'
import FileSelect from 'components/atoms/FileSelect'
import ico from 'img/dashboard-icons/fingerprint.svg'
import {uploadVerificationDocs} from 'store/state/app/actions'
import {ID_VERIF_STATUSES} from 'utils/constants'

import * as $ from './index.style'


class AccountSubmitIDDocs extends React.Component {
  state = {
    changeMode: false,
    frontFile: null,
    backFile: null,
    selfieFile: null,
  }

  render() {
    const {l} = this.props

    const icoEl = <img className={$.ico} src={ico}/>

    return (
      <SwitchableMiniPanel label={l('title')} title={l('title')} desc={l('desc')} ico={icoEl}
                           btnRender={this._btnRender} childrenRender={this._contentRender}/>
    )
  }

  _btnRender = (toggle) => {
    const {l, disabled} = this.props

    return <Button lightCyan onClick={toggle} disabled={disabled}>{l('btn.submit')}</Button>
  }

  _contentRender = (toggle) => {
    const {l, upload} = this.props
    const {frontFile, backFile, selfieFile} = this.state

    return (
      <div className={$.submitIDDocs}>
        <div className={$.files}>
          <FileSelect title={l('frontTip')} images onChange={this._onFrontSelect}/>
          <FileSelect title={l('backTip')} images onChange={this._onBackSelect}/>
          <FileSelect title={l('selfieTip')} images onChange={this._onSelfieSelect}/>
        </div>
        <div className={$.actions}>
          <Button sm green disabled={!frontFile || !backFile || !selfieFile}
                  onClick={() => upload(frontFile, backFile, selfieFile)}>
            {l('btn.upload')}
          </Button>
        </div>
      </div>
    )
  }

  _onFrontSelect = (frontFile) => this.setState({frontFile})

  _onBackSelect = (backFile) => this.setState({backFile})

  _onSelfieSelect = (selfieFile) => this.setState({selfieFile})
}

const mapStateToProps = ({app, locale}) => ({
  disabled: app.user.idVerification !== ID_VERIF_STATUSES.UNVERIFIED,
  l: (key) => getTranslate(locale)('submitIDDocsPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  upload: (front, back, selfie) => dispatch(uploadVerificationDocs({front, back, selfie}))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSubmitIDDocs)