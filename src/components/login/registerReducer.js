import {
  UPDATE_FIELD,
  REGISTER
}
from '../../constants/actionTypes'

let initialState = {
  nombre : "",
  apellido: "",
  email: "",
  cifnif: "",
  password: "",
  password2: "",
  captcha: false,
  politica: false,
  ofertas: false
}
export default function register(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FIELD:
          state[action.field] = action.data;
            return {
                ...state,
            };
          case REGISTER:
            
            default:
                return state;
        }
    }
