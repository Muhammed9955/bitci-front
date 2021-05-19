import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import UserLevel from 'components/atoms/UserLevel'
import Badge from 'components/atoms/Badge'
import Link from 'components/atoms/Link'
import {Desktop, Mobile} from 'components/layout'
import Modal from 'components/atoms/Modal'
import accountRoundedSvg from 'img/dashboard-icons/account-rounded.svg'
import copyIco from 'img/dashboard-icons/copy.svg'
import {copyReflink} from 'store/state/app/actions'
import {ID_VERIF_STATUSES} from 'utils/constants'

import * as $ from './index.style'


class AccountUserInfo extends React.Component {
  state = {showCopyTip: false}

  render() {
    const {email, idVerification, refCode, l} = this.props
    const {showCopyTip} = this.state

    const verificationTxt = idVerification === ID_VERIF_STATUSES.VERIFIED
      ? l('verified')
      : (idVerification === ID_VERIF_STATUSES.UNVERIFIED ? l('unverified') : idVerification)

    return (
      <div className={$.accountUserInfo}>
        <div className={$.left}>
          <img src={accountRoundedSvg} className={$.accountImg} alt=""/>
        </div>

        <div className={$.right}>
          <Desktop component='div' className={$.infoLine}>
            <span className={$.email}>{email}</span>
            <UserLevel label={l('lvl')} level={1}/>
            <Badge lightCyan={idVerification === ID_VERIF_STATUSES.VERIFIED}>
              {verificationTxt}
            </Badge>
          </Desktop>

          <Mobile component='div' className={$.infoLine}>
            <span className={$.email}>{email}</span>
          </Mobile>

          {/*<div className={$.infoLine}>*/}
          {/*<span className={$.lastLoginInfo}>*/}
          {/*{l('lastLogin')}: 2018-02-10  18:40:45   IP: 24.144.32.432*/}
          {/*</span>*/}
          {/*</div>*/}
          {/*<div className={$.infoLine}>*/}
          {/*<UsingBNB/>*/}
          {/*</div>*/}
          <div className={$.infoLine}>
            <span className={$.refCode}>
              Ref Code:&nbsp;
              <Link color="lightCyan" underline lg onClick={this._onRefCodeClick}>{refCode}</Link>
              <span className={$.refCodeTip}> (click to copy the link)</span>
            </span>
          </div>
        </div>

        {/*<Mobile component='div' className={$.bottom}>*/}
        {/*<span className={$.lastLoginInfo}>*/}
        {/*{l('lastLogin')}: 2018-02-10  18:40:45   IP: 24.144.32.432*/}
        {/*</span>*/}
        {/*</Mobile>*/}

        <Mobile>
          {showCopyTip && (
            <Modal sm>
              <div className={$.copyTip}>Copied.</div>
            </Modal>
          )}
        </Mobile>
      </div>
    )
  }

  _onRefCodeClick = () => {
    const {onRefCodeClick} = this.props

    this.setState({showCopyTip: true}, () => (
      setTimeout(() => this.setState({showCopyTip: false}), 1000)
    ))

    onRefCodeClick()
  }
}

const mapStateToProps = ({app, locale}) => ({
  email: app.user.username,
  idVerification: app.user.idVerification,
  refCode: app.user.refCode,
  l: (key) => getTranslate(locale)('accountPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  onRefCodeClick: () => dispatch(copyReflink()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountUserInfo)