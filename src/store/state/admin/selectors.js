import get from 'lodash/get'

export const getUsers = (admin) => get(admin, 'users.list', [])

export const getUser = (admin, userId) => get(admin, `users.map.${userId}`, null)
