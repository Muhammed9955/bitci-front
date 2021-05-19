import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Page from 'components/pages/Page'
import DepositWithdrawals from 'components/organisms/DepositWithdrawals'
import DepositsWithdrawalsHistory from 'components/organisms/DepositsWithdrawalsHistory'
import paths from 'utils/paths'


const WalletsPage = () => (
  <Page>
    <div className="row">
      <div className="col-xs-12 col-md-12">
        <Switch>
          <Route path={paths.WALLETS_HISTORY} render={({match}) => (
            <DepositsWithdrawalsHistory currency={match.params.currency}/>
          )}/>

          <DepositWithdrawals/>
        </Switch>
      </div>
    </div>
  </Page>
)

export default WalletsPage