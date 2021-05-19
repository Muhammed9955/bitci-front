import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import Table from 'components/atoms/Table'
import {formatDate} from 'utils/date'
import * as api from 'api'
import paths, {fillPath} from 'utils/paths'

import * as $ from './index.style'


class AllDepositsList extends React.Component {
  state = {deposits: []}

  componentDidMount() {
    api.getAllDeposits().then((deposits) => this.setState({deposits}))
  }

  render() {
    const {onUserIdClick} = this.props
    const {deposits} = this.state

    const columns = [{
      Header: 'UserId',
      accessor: 'UserId',
      minWidth: 140,
      getProps: (state, {row}, {id}) => ({
        style: {cursor: 'pointer', textDecoration: 'underline'},
        onClick: () => onUserIdClick(row[id]),
      }),
    }, {
      Header: 'Amount',
      accessor: 'Amount',
    }, {
      Header: 'BlockNumber',
      accessor: 'BlockNumber',
    }, {
      Header: 'CurrencyType',
      accessor: 'CurrencyType',
    }, {
      id: 'InsertDttm',
      Header: 'InsertDttm',
      accessor: ({InsertDttm}) => formatDate(new Date(InsertDttm)),
    }, {
      id: 'Processed',
      Header: 'Processed',
      accessor: ({Processed}) => `${Processed}`,
      getProps: (state, {row}, {id}) => ({className: row[id] ? $.trueText : $.falseText})
    }, {
      Header: 'ReferralCode',
      accessor: 'ReferralCode',
    }]


    const tableProps = {
      columns,
      showPagination: true,
      data: deposits,
      filterable: true,
    }

    return <Table {...tableProps}/>
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUserIdClick: (userId) => dispatch(push(fillPath(paths.ADMIN_USERS_DETAILS, {userId})))
})

export default connect(null, mapDispatchToProps)(AllDepositsList)