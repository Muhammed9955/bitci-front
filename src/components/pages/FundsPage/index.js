import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import {Switch, Route} from 'react-router-dom'

import Page from 'components/pages/Page'
import PageHeader from 'components/atoms/PageHeader'
import Funds from 'components/organisms/Funds'
import DepositOverlay from 'components/organisms/DepositOverlay'
import WithdrawalOverlay from 'components/organisms/WithdrawalOverlay'
import paths from 'utils/paths'


const FundsPage = ({l}) => (
  <Switch>
    <Route path={paths.FUNDS_DEPOSIT}>
      <DepositOverlay/>
    </Route>

    <Route path={paths.FUNDS_WITHDRAWAL}>
      <WithdrawalOverlay/>
    </Route>

    <Page>
      <PageHeader title={l('title')}/>
      <Funds/>
    </Page>
  </Switch>
)

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('fundsPanel.' + key),
})

export default connect(mapStateToProps)(FundsPage)