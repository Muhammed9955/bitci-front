import React from 'react'

import Page from 'components/pages/Page'
import Tickers from 'components/embedded/Tickers'
import TickersTable from 'components/embedded/TickersTable'


const EmbeddedTestPage = () => {
  return (
    <Page>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-12'>
            <TickersTable/>
            <Tickers/>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default EmbeddedTestPage