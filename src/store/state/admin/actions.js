import {SET_USERS, CHANGE_USER_ID_VERIF} from './types'

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
})

export const changeUserIdVerif = (userId, status) => ({
  type: CHANGE_USER_ID_VERIF,
  payload: {userId, status},
})
