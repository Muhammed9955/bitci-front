import {eventChannel} from 'redux-saga'

import emitter from 'api/emitter'


export default (event) => {
  return eventChannel((emit) => {
    const onEvent = (data) => emit(data || {})

    emitter.on(event, onEvent)

    return () => emitter.off(event, onEvent)
  })
}
