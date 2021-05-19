import {SET_USERS} from './types'


const initialState = {
  users: {list: [], map: {}},
}

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case SET_USERS: {
      return {
        ...state,
        users: {
          list: payload,
          map: payload.reduce((map, user) => ({...map, [user.UserId]: user}), {})
        }
      }
    }
    default: return state
  }
}