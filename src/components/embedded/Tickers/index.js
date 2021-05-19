import React from 'react'

import TickersTable from 'components/embedded/TickersTable'
import TickersGrid from 'components/embedded/TickersGrid'
import {Mobile, Desktop} from 'components/layout'


const Tickers = ({sm}) => {

  if(sm) return <TickersGrid sm={sm}/>

  return (
    <div>
      <Mobile>
        <TickersGrid/>
      </Mobile>

      <Desktop>
        <TickersTable/>
      </Desktop>
    </div>
  )
}

export default Tickers