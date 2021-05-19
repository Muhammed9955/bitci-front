export default class Collector {
  _subscribers = []
  _data = undefined

  constructor(reducerCreator, socket, socketEvent, emptyData, reducerParams) {
    this._socketEvent = socketEvent
    this._reducerCreator = reducerCreator
    this._emptyData = emptyData

    this.reConfig(emptyData, reducerParams)

    this._listenSocket(socket)
  }

  changeSocket(newSocket) {
    this.reset()

    this._listenSocket(newSocket)
  }

  subscribe(cb) {
    this._subscribers = this._subscribers.concat(cb)

    cb(this._data)
  }

  unsubscribe(cb) {
    for (let i = 0; i < this._subscribers.length; i++) {
      if (cb === this._subscribers[i]) {
        this._subscribers = [...this._subscribers.slice(0, i), ...this._subscribers.slice(i + 1)]
      }
    }
  }

  getData() {
    return this._data
  }

  reConfig(initialData, reducerParams = {}, isRawData = false) {
    this._reducerParams = reducerParams
    this._reducer = this._reducerCreator(reducerParams)

    this._setData(isRawData ? this._reducer(this._emptyData, initialData) : initialData)
  }

  reset(initialData = this._emptyData, isRawData = false) {
    this.reConfig(initialData, this._reducerParams, isRawData)
  }

  _listenSocket = (socket) => {
    socket.on(this._socketEvent, (newData) => {
      this._setData(this._reducer(this._data, newData))
    })
  }

  _setData = (data) => {
    this._data = data

    this._subscribers.forEach((cb) => cb(this._data))
  }
}