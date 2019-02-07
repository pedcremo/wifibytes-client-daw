import {
  UPDATE_FIELD,
  REGISTER,
  ERROR_FIELD
}from '../../constants/actionTypes';
import {Utils} from '../../utils'

export const updateField = (data, field)=>({
    type: UPDATE_FIELD,
    data,
    field
})

export const errorField = (data, field)=>({
  type: ERROR_FIELD,
  data,
  field
})

export const register = (data) => ({
  type: REGISTER,
  payload: Utils.post("/cliente/",data),
  isAuth: true
})
