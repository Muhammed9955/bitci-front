import React from 'react'

import Table from 'components/atoms/Table'
import * as api from 'api'


const columns = [{
  Header: 'NetworkTransactionHash',
  accessor: 'NetworkTransactionHash',
}, {
  Header: 'BlockNumber',
  accessor: 'BlockNumber',
}, {
  Header: 'UserId',
  accessor: 'UserId',
}, {
  Header: 'CurrencyType',
  accessor: 'CurrencyType',
}, {
  Header: 'Processed',
  accessor: 'Processed',
}, {
  Header: 'InsertDttm',
  accessor: 'InsertDttm',
}]

class UserWithdrawalsList extends React.Component {
  state = {withdrawals: []}

  componentDidMount() {
    const {userId} = this.props

    api.getWithdrawalsByUser(userId).then((withdrawals) => this.setState({withdrawals}))
  }

  render() {
    const {withdrawals} = this.state

    const tableProps = {
      columns,
      showPagination: true,
      data: withdrawals,
    }

    return <Table {...tableProps}/>
  }
}

export default UserWithdrawalsList