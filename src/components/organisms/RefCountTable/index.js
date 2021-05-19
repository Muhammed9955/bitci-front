import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Table from 'components/atoms/Table'
import MiniPanel from 'components/atoms/MiniPanel'


const RefCountTable = ({refCount, l}) => {
  const columns = [{
    Header: l('columns.lvl'),
    accessor: 'Lvl',
  }, {
    Header: l('columns.users'),
    accessor: 'UserCount',
  }, {
    Header: l('columns.activeUsers'),
    accessor: 'ActiveUserCount',
  }]

  const tableProps = {
    columns,
    pageSize: Number.MAX_SAFE_INTEGER,
    data: refCount,
  }

  return (
    <MiniPanel label={l('title')}>
      <Table {...tableProps}/>
    </MiniPanel>
  )
}


const mapStateToProps = ({app, locale}) => ({
  refCount: app.refCount,
  l: (key) => getTranslate(locale)('refCountTable.' + key),
})

export default connect(mapStateToProps)(RefCountTable)