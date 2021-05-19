import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import MiniPanel from 'components/atoms/MiniPanel'
import Table from 'components/atoms/Table'


const RefGainTable = ({refGain, l}) => {
  const columns = [{
    Header: l('columns.currency'),
    accessor: 'CurrencyType',
  }, {
    Header: l('columns.lvl1'),
    accessor: 'Lvl1RefereeGain',
  }, {
    Header: l('columns.lvl2'),
    accessor: 'Lvl2RefereeGain',
  }, {
    Header: l('columns.lvl3'),
    accessor: 'Lvl3RefereeGain',
  }]

  const tableProps = {
    columns,
    pageSize: Number.MAX_SAFE_INTEGER,
    data: refGain,
  }

  return (
    <MiniPanel label={l('title')}>
      <Table {...tableProps}/>
    </MiniPanel>
  )
}

const mapStateToProps = ({app, locale}) => ({
  refGain: app.refGain,
  l: (key) => getTranslate(locale)('refGainTable.' + key),
})

export default connect(mapStateToProps)(RefGainTable)