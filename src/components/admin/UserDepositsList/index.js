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

class UserDepositsList extends React.Component {
  state = {deposits: []}

  componentDidMount() {
    const {userId} = this.props

    api.getDepositsByUser(userId).then((deposits) => this.setState({deposits}))
  }

  render() {
    const {deposits} = this.state

    const tableProps = {
      columns,
      showPagination: true,
      data: deposits,
    }

    return <Table {...tableProps}/>
  }
}

export default UserDepositsList