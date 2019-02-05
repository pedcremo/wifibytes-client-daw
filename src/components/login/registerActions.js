import {
  UPDATE_FIELD
}from '../../constants/actionTypes';

export const updateField = (data, field)=>({
    type: UPDATE_FIELD,
    data,
    field
})
