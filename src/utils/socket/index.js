import io from 'socket.io-client'
import React from 'react'

import * as EVENTS from './types'


const SOCKET_ADDR = 'https://exchange-wss.bigdatalabs.io'


const socketContainer = (function () {
  const initSocket = (pair) => {
    const socket = io(SOCKET_ADDR, {autoConnect: false, query: {pair}})

    socket.on('connect', () => (isConnected = true))
    socket.on('disconnect', () => (isConnected = false))

    return socket
  }

  let subscribers = []
  let isConnected = false
  let socket = initSocket('ETH-BTC')

  return {
    get: () => socket,
    isConnected: () => isConnected,
    setChannel: (pairName) => {
      if (socket) {
        isConnected && socket.disconnect()
        socket.removeAllListeners()
      }

      socket = initSocket(pairName)

      subscribers.forEach((cb) => cb(socket))
    },
    subscribe: (cb) => (subscribers = subscribers.concat(cb)),
    unsubscribe: (cb) => {
      for (let i = 0; i < subscribers.length; i++) {
        if (cb === subscribers[i]) {
          subscribers = subscribers.slice(0, i).concat(subscribers.slice(i + 1))
        }
      }
    }
  }
})()

export {EVENTS}

export const emitAnswerPromise = (socket, event, data) => (
  new Promise((resolve) => (
    socket.emit(event, data, (answer) => resolve(answer))
  ))
)

export default socketContainer

export const connect = () => {
  socketContainer.get().connect()
}

export const disconnect = () => {
  socketContainer.get().disconnect()
}

export const up = (pairName) => {
  socketContainer.setChannel(pairName)
  socketContainer.get().connect()
}

export const connectData = (event, mapDataToProps, mapEmitToProps) => (WrappedComponent) => {
  class SocketWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        prevData: undefined,
        data: undefined
      }

      this._emit = this._emit.bind(this)
      this._onData = this._onData.bind(this)
      this._listenSocket = this._listenSocket.bind(this)
      this._unlistenSocket = this._unlistenSocket.bind(this)
    }

    componentDidMount() {
      this._listenSocket(socketContainer.get())
      socketContainer.subscribe(this._listenSocket)
    }

    componentWillUnmount() {
      this._unlistenSocket(socketContainer.get())
      socketContainer.unsubscribe(this._listenSocket)
    }

    render() {
      const {data, prevData} = this.state

      return <WrappedComponent
        {...this.props}
        {...(mapDataToProps && mapDataToProps(data, prevData, this.props))}
        {...(mapEmitToProps && mapEmitToProps(this._emit, this.props))}
      />
    }

    _emit(event, data) {
      socketContainer.get().emit(event, data)
    }

    _onData(newData) {
      const prevData = this.state.data

      this.setState({
        prevData,
        data: newData
      })
    }

    _listenSocket(socket) {
      socket.on(event, this._onData)
    }

    _unlistenSocket(socket) {
      socket.off(event, this._onData)
    }
  }

  return SocketWrapper
}

export const connectStatus = (mapStatusToProps, mapActionsToProps) => (WrappedComponent) => {
  class SocketStatusWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isConnected: socketContainer.isConnected()
      }

      this._connect = this._connect.bind(this)
      this._disconnect = this._disconnect.bind(this)
      this._onConnect = this._onConnect.bind(this)
      this._onDisconnect = this._onDisconnect.bind(this)
      this._listenSocket = this._listenSocket.bind(this)
      this._unlistenSocket = this._unlistenSocket.bind(this)
    }

    componentDidMount() {
      this._listenSocket(socketContainer.get())
      socketContainer.subscribe(this._listenSocket)
    }

    componentWillUnmount() {
      this._unlistenSocket(socketContainer.get())
      socketContainer.unsubscribe(this._listenSocket)
    }

    render() {
      return <WrappedComponent
        {...this.props}
        {...(mapStatusToProps && mapStatusToProps(this.state.isConnected, this.props))}
        {...(mapActionsToProps && mapActionsToProps(this._connect, this._disconnect, this.props))}
      />
    }

    _connect() {
      return socketContainer.get().connect()
    }

    _disconnect() {
      return socketContainer.get().disconnect()
    }

    _onConnect() {
      this.setState({
        isConnected: true
      })
    }

    _onDisconnect() {
      this.setState({
        isConnected: false
      })
    }

    _listenSocket(socket) {
      socket.on('connect', this._onConnect)
      socket.on('disconnect', this._onDisconnect)
    }

    _unlistenSocket(socket) {
      socket.off('connect', this._onConnect)
      socket.off('disconnect', this._onDisconnect)
    }
  }

  return SocketStatusWrapper
}