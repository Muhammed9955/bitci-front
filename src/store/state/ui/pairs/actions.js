import {TOGGLE_FAVORITES, SET_CURRENCY, SET_VOLUME_MODE} from './types'


export const toggleFavorites = (bool) => ({
  type: TOGGLE_FAVORITES,
  payload: bool,
})

export const setCurrency = (currency = null) => ({
  type: SET_CURRENCY,
  payload: currency,
})

export const setVolumeMode = (bool) => ({
  type: SET_VOLUME_MODE,
  payload: bool
})
