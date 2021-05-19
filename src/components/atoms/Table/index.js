import React from 'react'
import ReactTable, {ReactTableDefaults} from 'react-table'
import cs from 'classnames'
import 'react-table/react-table.css'

import Paginator from './views/paginator'
import * as $ from './index.style'


Object.assign(ReactTableDefaults, {
  resizable: false,
  sortable: false,
  showPagination: false,
  showPageSizeOptions: false,
  defaultPageSize: 15,
  minRows: 0,
  NoDataComponent: () => null,
  PaginationComponent: Paginator,
  defaultFilterMethod: (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
  },
  column: {
    ...ReactTableDefaults.column,
    className: $.cell,
    headerClassName: $.header,
  }
})

const Table = (props) => {
  const {striped, ...restProps} = props
  return (
    <div className={$.table}>
      <ReactTable {...restProps} className={cs({'-striped': striped})}/>
    </div>
  )
}

export default Table