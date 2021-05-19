import React from 'react'

import Table from 'components/atoms/Table'
import {formatDate} from 'utils/date'
import * as api from 'api'


const columns = [{
  Header: 'OrderId',
  accessor: 'OrderId',
}, {
  Header: 'CurrencyPair',
  accessor: 'CurrencyPair',
}, {
  Header: 'Side',
  accessor: 'Side',
}, {
  Header: 'Price',
  accessor: 'Price',
}, {
  Header: 'Amount',
  accessor: 'Amount',
}, {
  Header: 'Type',
  accessor: 'Type',
}, {
  Header: 'Status',
  accessor: 'Status',
}, {
  id: 'OrderDateTime',
  Header: 'OrderDateTime',
  accessor: ({OrderDateTime}) => formatDate(new Date(OrderDateTime)),
}]

class UserOrdersList extends React.Component {
  state = {orders: []}

  componentDidMount() {
    const {userId} = this.props

    api.getOrdersByUser(userId).then((orders) => this.setState({orders}))
  }

  render() {
    const {orders} = this.state

    const tableProps = {
      columns,
      showPagination: true,
      data: orders,
    }

    return <Table {...tableProps}/>
  }
}

export default UserOrdersList