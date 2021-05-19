import React from 'react'

import Page from 'components/pages/Page'
import OrdersHistory from 'components/organisms/OrdersHistory'


const OrdersPage = () => (
  <Page>
    <div className="row">
      <div className="col-xs-12 col-md-12">
        <OrdersHistory/>
      </div>
    </div>
  </Page>
)

export default OrdersPage