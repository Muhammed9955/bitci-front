import React from 'react'
import ReactDOM from 'react-dom'

import Tickers from 'components/embedded/Tickers'
import TickersTable from 'components/embedded/TickersTable'
import TickersGrid from 'components/embedded/TickersGrid'


window.BitexmarEmbedded = {
  Tickers: (node, props) => ReactDOM.render(<Tickers {...props}/>, node),
  TickersTable: (node, props) => ReactDOM.render(<TickersTable {...props}/>, node),
  TickersGrid: (node, props) => ReactDOM.render(<TickersGrid {...props}/>, node),
}