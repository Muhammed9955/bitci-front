import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import OrderForm from 'components/organisms/OrderForm'
import {editOrder} from 'store/state/app/actions'

import * as $ from './index.style'


class EditOrder extends React.Component {
  constructor(props) {
    super(props)

    const {order} = props

    this._order = order

    this.state = {
      limit: order.price,
      size: order.amount,
      stop: order.stop,
    }
  }

  render() {
    const {l} = this.props
    const {size, limit, stop} = this.state
    const {type} = this._order

    return (
      <div className={$.editOrder}>
        <OrderForm type={type}
                   onSubmit={this._onSubmit}
                   submitTxt={l('edit')}
                   limit={limit}
                   stop={stop}
                   size={size}
                   onChange={this._onChange}/>
      </div>
    )
  }

  _onChange = (field, val) => {
    this.setState({
      [field]: val,
    })
  }

  _onSubmit = () => {
    const {limit, size, stop} = this.state
    const {edit, onSubmit} = this.props

    const orderForEdit = {
      ...this._order,
      price: limit,
      amount: size,
      stop: stop,
    }

    edit(orderForEdit)

    onSubmit && onSubmit(orderForEdit)
  }
}

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('orderForm.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  edit: (editedOrder) => dispatch(editOrder(editedOrder)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder)