import React from 'react'

import Table from 'components/atoms/Table'
import {formatDate} from 'utils/date'
import * as api from 'api'


const columns = [{
  Header: 'TransactionID',
  accessor: 'TransactionID',
}, {
  id: 'TransactionDateTime',
  Header: 'TransactionDateTime',
  accessor: ({TransactionDateTime}) => formatDate(new Date(TransactionDateTime)),
}, {
  Header: 'BuyOrderId',
  accessor: 'BuyOrderId',
}, {
  Header: 'SellOrderId',
  accessor: 'SellOrderId',
}, {
  Header: 'BuyUserId',
  accessor: 'BuyUserId',
}, {
  Header: 'SellUserId',
  accessor: 'SellUserId',
}, {
  Header: 'CurrencyPair',
  accessor: 'CurrencyPair',
}, {
  Header: 'Amount',
  accessor: 'Amount',
}, {
  Header: 'Price',
  accessor: 'Price',
}]

class UserTransactionsList extends React.Component {
  state = {transactions: []}

  componentDidMount() {
    const {userId} = this.props

    api.getTransactionsByUser(userId).then((transactions) => this.setState({transactions}))
  }

  render() {
    const {transactions} = this.state

    const tableProps = {
      columns,
      showPagination: true,
      data: transactions,
    }

    return <Table {...tableProps}/>
  }
}

export default UserTransactionsList