import {
  UPDATE_FIELD
}
from '../../constants/actionTypes'

let initialState = {
  nombre : "",
  apellido: "",
  email: "",
  cifnif: "",
  password: "",
  password2: "",
  captcha: false
}
export default function register(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FIELD:
        console.log(action)
          state[action.field] = action.data;
            return {
                ...state,
            };
            default:
                return state;
        }
    }
