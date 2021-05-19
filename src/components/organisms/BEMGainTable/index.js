import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import MiniPanel from 'components/atoms/MiniPanel'
import Table from 'components/atoms/Table'
import {formatDate} from 'utils/date'


const BEMGainTable = ({l, bemGain}) => {
  const columns = [{
    id: 'date',
    Header: l('columns.date'),
    accessor: ({GainDate}) => formatDate(new Date(GainDate)),
  }, {
    id: 'amount',
    Header: l('columns.amount'),
    accessor: ({Amount, CurrencyType}) => `${Amount}  ${CurrencyType}`,
  }]

  const tableProps = {
    columns,
    pageSize: Number.MAX_SAFE_INTEGER,
    data: bemGain,
  }

  return (
    <MiniPanel label={l('title')}>
      <Table {...tableProps}/>
    </MiniPanel>
  )
}

const mapStateToProps = ({app, locale}) => ({
  bemGain: app.bemGain,
  l: (key) => getTranslate(locale)('bemGainTable.' + key),
})

export default connect(mapStateToProps)(BEMGainTable)