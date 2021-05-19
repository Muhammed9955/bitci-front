import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Page from 'components/pages/Page'
import AccountUserInfo from 'components/organisms/AccountUserInfo'
import AccountPassword from 'components/organisms/AccountPassword'
import AccountLevelInfo from 'components/organisms/AccountLevelInfo'
import AccountTwoFactor from 'components/organisms/AccountTwoFactor'
import AccountSubmitIDDocs from 'components/organisms/AccountSubmitIDDocs'
import PageHeader from 'components/atoms/PageHeader'
import {UsingBNB, IdentifyAuth, GoogleAuth, SMSAuth, Settings} from 'components/organisms/AccountOptions'
import MiniPanel from 'components/atoms/MiniPanel'
import {BottomMenuHeaderPortal} from 'components/organisms/BottomMenu'
import Button from 'components/atoms/Button'
import {Mobile, Desktop} from 'components/layout'
import RefCountTable from 'components/organisms/RefCountTable'
import RefGainTable from 'components/organisms/RefGainTable'
import BEMGainTable from 'components/organisms/BEMGainTable'
import {logoutUser} from 'store/state/app/actions'

import * as $ from './index.style'


const AccountPage = ({l, logout}) => (
  <Page>
    <Mobile>
      <PageHeader title={l('title')}/>
    </Mobile>

    <Desktop component='div' className={$.accountPage}>
      <div className={$.container}>
        <AccountUserInfo/>
      </div>
      <div className={$.container}>
        <AccountLevelInfo/>
      </div>
      <div className={$.container}>
        <AccountPassword/>
      </div>
      <div className={$.container}>
        <AccountTwoFactor/>
      </div>
      <div className={$.container}>
        <AccountSubmitIDDocs/>
      </div>
      <div className={$.container}>
        <RefCountTable/>
      </div>
      <div className={$.container}>
        <BEMGainTable/>
      </div>
      <div className={$.container}>
        <RefGainTable/>
      </div>
    </Desktop>

    <Mobile component='div' className={$.accountPage}>
      <div className={$.container}>
        <AccountUserInfo/>
      </div>
      {/*<div className={$.container}>*/}
      {/*<MiniPanel><UsingBNB/></MiniPanel>*/}
      {/*</div>*/}
      <div className={$.container}>
        <MiniPanel><IdentifyAuth/></MiniPanel>
      </div>
      <div className={$.container}>
        <MiniPanel><GoogleAuth/></MiniPanel>
      </div>
      {/*<div className={$.container}>*/}
      {/*<MiniPanel><SMSAuth/></MiniPanel>*/}
      {/*</div>*/}
      {/*<div className={$.container}>*/}
      {/*<MiniPanel><Settings/></MiniPanel>*/}
      {/*</div>*/}
    </Mobile>

    <Mobile component={BottomMenuHeaderPortal}>
      <div className={$.logoutContainer}>
        <Button lightCyan outline className={$.logout} onClick={logout}>{l('logout')}</Button>
      </div>
    </Mobile>
  </Page>
)

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('accountPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)