import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Toggle from 'components/atoms/Toggle'
import {Mobile} from 'components/layout'
import Badge from 'components/atoms/Badge'
import UserLevel from 'components/atoms/UserLevel'
import bnbIco from 'img/dashboard-icons/bnb.svg'
import identifyAuthIco from 'img/dashboard-icons/fingerprint.svg'
import googleAuthIco from 'img/dashboard-icons/f2a.svg'
import smsAuthIco from 'img/dashboard-icons/phone-lock.svg'
import settingsIco from 'img/dashboard-icons/settings.svg'
import settingsArrowIco from 'img/dashboard-icons/minimal-arrow.svg'
import {ID_VERIF_STATUSES} from 'utils/constants'

import * as $ from './index.style'


const mapStateToProps = ({locale, app}) => {
  const {idVerification, f2a: f2aEnabled} = app.user

  return {
    idVerification,
    f2aEnabled,
    smsAuthEnabled: false,
    l: (key) => getTranslate(locale)('accountPanel.' + key),
  }
}

export const UsingBNB = connect(mapStateToProps)(
  ({l}) => (
    <div className={$.container}>
      <Mobile component='img' src={bnbIco} className={$.ico}/>
      <span className={$.tip}>{l('usingBNB')}</span>
      <Toggle active={false}/>
    </div>
  ),
)

export const IdentifyAuth = connect(mapStateToProps)(
  ({l, idVerification}) => {
    const verificationTxt = idVerification === ID_VERIF_STATUSES.VERIFIED
      ? l('verified')
      : (idVerification === ID_VERIF_STATUSES.UNVERIFIED ? l('unverified') : idVerification)

    return (
      <div className={$.container}>
        <img src={identifyAuthIco} className={$.ico}/>
        <span className={$.tip}>{l('identifyAuth')}</span>
        <UserLevel label={l('lvl')} level={1}/>
        <Badge lightCyan={idVerification === ID_VERIF_STATUSES.VERIFIED}>{verificationTxt}</Badge>
      </div>
    )
  },
)

export const GoogleAuth = connect(mapStateToProps)(
  ({l, f2aEnabled}) => (
    <div className={$.container}>
      <img src={googleAuthIco} className={$.ico}/>
      <span className={$.tip}>{l('googleAuth')}</span>
      {f2aEnabled
        ? <span className={$.activeText}>{l('on')}</span>
        : <span className={$.disabledText}>{l('off')}</span>
      }
    </div>
  ),
)

export const SMSAuth = connect(mapStateToProps)(
  ({l, smsAuthEnabled}) => (
    <div className={$.container}>
      <img src={smsAuthIco} className={$.ico}/>
      <span className={$.tip}>{l('smsAuth')}</span>
      {smsAuthEnabled
        ? <span className={$.activeText}>{l('on')}</span>
        : <span className={$.disabledText}>{l('off')}</span>
      }
    </div>
  ),
)

export const Settings = connect(mapStateToProps)(
  ({l}) => (
    <div className={$.container}>
      <img src={settingsIco} className={$.ico}/>
      <span className={$.tip}>{l('settings')}</span>
      <img src={settingsArrowIco} className={$.ico}/>
    </div>
  )
)
