import {
  SET_VALUE,
  CREATE_FORM,
  RESET_FORM,
} from './types'

export const setValue = (form, field, value) => ({
  type: SET_VALUE,
  payload: {form, field, value},
})

export const createForm = (form, fields) => ({
  type: CREATE_FORM,
  payload: {form, fields},
})

export const resetForm = (form) => ({
  type: RESET_FORM,
  payload: {form},
})
