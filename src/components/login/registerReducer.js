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
  nifnie: "nif",
  captcha: false,
  politica: false,
  ofertas: false,
  errorNombre: false,
  errorApellido: false,
  errorEmail: false,
  errorPassword: false,
  errorPassword2: false,
  errorCifnif: false
}
export default function register(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FIELD:
          state[action.field] = action.data;
            return {
                ...state,
            };
          case REGISTER:
            console.log("Entro");
            break;
          default:
            return state;
        }
    }
