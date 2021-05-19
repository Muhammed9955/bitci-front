import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import Table from 'components/atoms/Table'
import Button from 'components/atoms/Button'
import paths, {fillPath} from 'utils/paths'
import {formatDate} from 'utils/date'
import {getUsers} from 'store/state/admin/selectors'

import * as $ from './index.style'


class UsersList extends React.Component {
  render() {
    const {users, openDetails, filter, filterUserId} = this.props

    const columns = [{
      Header: 'UserId',
      accessor: 'UserId',
      minWidth: 200,
    }, {
      Header: 'OwnReferralCode',
      accessor: 'OwnReferralCode',
    }, {
      Header: 'ReferredBy',
      accessor: 'ReferredBy',
      minWidth: 200,
    }, {
      id: 'Deposit',
      Header: 'Deposit',
      accessor: ({Deposit}) => (<span className={Deposit ? $.trueText : $.falseText}>{`${Deposit}`}</span>),
    }, {
      id: 'CreatedDate',
      Header: 'CreatedDate',
      accessor: ({CreatedDate}) => formatDate(new Date(CreatedDate)),
    }, {
      Header: 'idVerified',
      accessor: 'idVerified',
    }, {
      id: 'details',
      Header: '',
      accessor: (user) => <Button sm lightCyan onClick={() => openDetails(user.UserId)}>Details</Button>,
    }]

    const tableProps = {
      columns,
      showPagination: true,
      data: filter || filterUserId ? users.filter(this._filterUser) : users,
    }

    return <Table {...tableProps}/>
  }

  _filterUser = (user) => {
    const {filter, filterUserId} = this.props

    const isUserId = filterUserId
      ? user.UserId === filterUserId
      : true

    const isValues = filter
      ? Object.values(user).some((val) => `${val}`.toLowerCase().includes(filter))
      : true

    return isUserId && isValues
  }
}

const mapStateToProps = ({admin}) => ({
  users: getUsers(admin),
})

const mapDispatchToProps = (dispatch) => ({
  openDetails: (userId) => dispatch(push(fillPath(paths.ADMIN_USERS_DETAILS, {userId}))),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)