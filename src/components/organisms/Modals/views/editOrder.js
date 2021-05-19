import React from 'react'
import {connect} from 'react-redux'

import Modal from 'components/atoms/Modal'
import EditOrder from 'components/organisms/EditOrder'
import {openOrder} from 'store/state/app/actions'


const EditOrderModal = ({onClose, order}) => (
  order && (
    <Modal md onClose={onClose}>
      <EditOrder order={order} onSubmit={onClose}/>
    </Modal>
  )
)

const mapStateToProps = ({app}) => ({order: app.openedOrder})

const mapDispatchToProps = (dispatch) => ({onClose: () => dispatch(openOrder(null))})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderModal)
