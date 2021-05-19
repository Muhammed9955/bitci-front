import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import UserLevel from 'components/atoms/UserLevel'
import Link from 'components/atoms/Link'

import * as $ from './index.style'


const AccountLevelInfo = ({l, contactUsHref}) => (
  <div className={$.accountLevelInfo}>
    <div className={$.levels}>
      <div className={$.lvlInfoContainer}>
        <UserLevel label={l('lvl')} level={1} whiteTitle/>
        {/*<div className={$.lvlInfoTitle}>{l('withdrawalLimit')}</div>*/}
        {/*<div className={$.lvlInfoValue}>2 BTC</div>*/}
      </div>
      <div className={$.stripe}/>
      <div className={$.lvlInfoContainer}>
        <UserLevel label={l('lvl')} level={2} whiteTitle/>
        {/*<div className={$.lvlInfoTitle}>{l('withdrawalLimit')}</div>*/}
        {/*<div className={$.lvlInfoValue}>100 BTC</div>*/}
      </div>
      <div className={$.stripe}/>
      <div className={$.lvlInfoContainer}>
        <UserLevel label={l('lvl')} level={3} whiteTitle/>
        <div className={$.lvlInfoTitleLast}>{l('higherLimit')}</div>
      </div>
    </div>
    <div className={$.links}>
      <Link href={contactUsHref} blank lg underline>{l('contactUs')}</Link>
    </div>
  </div>
)

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('accountPanel.' + key),
  contactUsHref: 'https://support.com',
})

export default connect(mapStateToProps)(AccountLevelInfo)