import {TOGGLE_FAVORITES, SET_CURRENCY, SET_VOLUME_MODE} from './types'


const initialState = {
  favorites: false,
  currency: null,
  volumeMode: false,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TOGGLE_FAVORITES: {
      const {favorites} = state

      return {
        ...state,
        favorites: typeof payload !== 'undefined' ? payload : !favorites,
      }
    }
    case SET_CURRENCY: {
      return {...state, currency: payload}
    }
    case SET_VOLUME_MODE: {
      return {...state, volumeMode: payload}
    }
    default:
      return state
  }
}