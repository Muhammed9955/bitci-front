import React from 'react'
import {Desktop, Mobile} from 'components/layout'

import Complex from './views/table'
import List from './views/list'


const OrdersHistory = () => (
  <div>
    <Desktop component={Complex}/>
    <Mobile component={List}/>
  </div>
)

export default OrdersHistory