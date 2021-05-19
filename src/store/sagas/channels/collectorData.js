import {eventChannel} from 'redux-saga'

export default (collector) => (
  eventChannel((emit) => {
    const onEvent = (data) => emit(data)

    collector.subscribe(onEvent)

    return () => collector.unsubscribe(onEvent)
  })
)