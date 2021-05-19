import EventEmitter from 'wolfy87-eventemitter'


const emitter = new EventEmitter

export const EVENTS = {
  TOKEN_EXPIRED: 'tokenExpired',
}

export default emitter