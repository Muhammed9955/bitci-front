import React from 'react'
import {connect} from 'react-redux'

import Modal from 'components/atoms/Modal'
import OrderPriceChange from 'components/organisms/OrderPriceChange'
import {askChangeOrderPrice} from 'store/state/ui/orders/actions'


const ChangeOrderPriceSubmitModal = ({order, newPrice, onClose}) => (
  order && (
    <Modal sm onClose={onClose}>
      <OrderPriceChange order={order} newPrice={newPrice} onSubmit={onClose} onCancel={onClose}/>
    </Modal>
  )
)

const mapStateToProps = ({ui}) => {
  const {order = null, newPrice = 0} = ui.orders.askChangeOrderPrice || {}

  return {order, newPrice}
}

const mapDispatchToProps = (dispatch) => ({onClose: () => dispatch(askChangeOrderPrice(null))})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeOrderPriceSubmitModal)