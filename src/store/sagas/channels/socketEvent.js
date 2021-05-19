import {eventChannel} from 'redux-saga'


export default (socket, event) => {
  return eventChannel((emit) => {
    const onEvent = (data) => emit(data)

    socket.on(event, onEvent)

    return () => socket.off(event, onEvent)
  })
}