import React from 'react'

import Toasts from './toasts'


const toasts = new Toasts(15)

export default toasts

export const connectToasts = (mapToastsToProps, mapMethodsToProps) => (WrappedComponent) => {
  return class ToastsWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        toastsList: toasts.get(),
      }
    }

    componentDidMount() {
      toasts.on('update', this._onUpdate)
    }

    componentWillUnmount() {
      toasts.off('update', this._onUpdate)
    }

    render() {
      const {toastsList} = this.state

      return <WrappedComponent
        {...this.props}
        {...(mapToastsToProps && mapToastsToProps(toastsList, this.props))}
        {...(mapMethodsToProps && mapMethodsToProps(toasts, this.props))}
      />
    }

    _onUpdate = (toastsList) => this.setState({toastsList})
  }
}