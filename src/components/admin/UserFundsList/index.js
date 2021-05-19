import React from 'react'

import Table from 'components/atoms/Table'
import * as api from 'api'


const columns = [{
  Header: 'CurrencyType',
  accessor: 'CurrencyType',
}, {
  Header: 'FreeBalance',
  accessor: 'FreeBalance',
}, {
  Header: 'BlockedBalance',
  accessor: 'BlockedBalance',
}, {
  Header: 'WalletAddress',
  accessor: 'WalletAddress',
}]

class UserFundsList extends React.Component {
  state = {funds: []}

  componentDidMount() {
    const {userId} = this.props

    api.getFundsByUser(userId).then((funds) => this.setState({funds}))
  }

  render() {
    const {funds} = this.state

    const tableProps = {
      columns,
      showPagination: true,
      data: funds,
    }

    return <Table {...tableProps}/>
  }
}

export default UserFundsList