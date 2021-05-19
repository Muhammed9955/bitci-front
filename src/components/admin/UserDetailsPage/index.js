import React from 'react'
import {withRouter} from 'react-router-dom'

import Page from 'components/pages/Page'
import Container from 'components/atoms/Container'
import SwitchTabs from 'components/atoms/SwitchTabs'
import UserOrdersList from 'components/admin/UserOrdersList'
import UserTransactionsList from 'components/admin/UserTransactionsList'
import UserDepositsList from 'components/admin/UserDepositsList'
import UserWithdrawalsList from 'components/admin/UserWithdrawalsList'
import UserFundsList from 'components/admin/UserFundsList'
import UserUploadedDocs from 'components/admin/UserUploadedDocs'


const ORDER_LIST = 'orderList'
const TRANSACTION_LIST = 'transactionList'
const DEPOSIT_LIST = 'depositList'
const WITHDRAWAL_LIST = 'withdrawalList'
const USER_FUNDS = 'userFunds'
const UPLOADED_DOCS = 'uploadedDocs'

const TABS = [{
  code: ORDER_LIST,
  title: 'Order List',
}, {
  code: TRANSACTION_LIST,
  title: 'Transaction List',
}, {
  code: DEPOSIT_LIST,
  title: 'Deposit List',
}, {
  code: WITHDRAWAL_LIST,
  title: 'Withdrawal List',
}, {
  code: USER_FUNDS,
  title: 'User Funds',
}, {
  code: UPLOADED_DOCS,
  title: 'Uploaded Documents',
}]

class UserDetailsPage extends React.Component {
  state = {
    active: ORDER_LIST,
  }

  render() {
    const {active} = this.state

    return (
      <Page>
        <SwitchTabs tabs={TABS} active={active} onSwitch={this._onSwitch} dark/>

        <Container>
          {this._renderContent()}
        </Container>
      </Page>
    )
  }

  _renderContent = () => {
    const {match} = this.props
    const {active} = this.state

    const {userId} = match.params
    const props = {
      userId,
    }

    if (active === ORDER_LIST) return <UserOrdersList {...props}/>
    else if (active === TRANSACTION_LIST) return <UserTransactionsList {...props}/>
    else if (active === DEPOSIT_LIST) return <UserDepositsList {...props}/>
    else if (active === WITHDRAWAL_LIST) return <UserWithdrawalsList {...props}/>
    else if (active === USER_FUNDS) return <UserFundsList {...props}/>
    else if (active === UPLOADED_DOCS) return <UserUploadedDocs {...props}/>
  }

  _onSwitch = (active) => this.setState({active})
}

export default withRouter(UserDetailsPage)