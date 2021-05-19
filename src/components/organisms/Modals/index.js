import React from 'react'

import {ModalRoot} from 'components/atoms/Modal'

import EditOrderModal from './views/editOrder'
import ChangeOrderPriceSubmitModal from './views/changeOrderPriceSubmit'


const Modals = () => (
  <div>
    <ModalRoot/>

    <EditOrderModal/>
    <ChangeOrderPriceSubmitModal/>
  </div>
)

export default Modals