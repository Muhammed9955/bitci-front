import EventEmitter from 'wolfy87-eventemitter'
import genUUID from 'uuid/v4'


class Toasts extends EventEmitter {
  constructor(maxCount) {
    super()

    this._maxCount = maxCount
    this._toasts = []
  }

  add(text, type = 'info', timeout = 3000) {
    const toast = {
      id: genUUID(),
      text,
      type,
    }

    const newToasts = this._toasts.concat(toast)

    const toastsToSet = newToasts > this._maxCount
      ? newToasts.slice(0, newToasts.length - this._maxCount)
      : newToasts

    setTimeout(() => this.del(toast.id), timeout)

    this._setToasts(toastsToSet)
  }

  del(idToDel) {
    const delIndex = this._toasts.findIndex(({id}) => id === idToDel)

    if(delIndex < 0) return false

    const toastsToSet = this._toasts.slice(0, delIndex).concat(this._toasts.slice(delIndex + 1))

    this._setToasts(toastsToSet)

    return true
  }

  get() {
    return this._toasts
  }

  _setToasts = (toasts) => {
    this._toasts = toasts

    this.emit('update', toasts)
  }
}

export default Toasts