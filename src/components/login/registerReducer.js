import {
  UPDATE_FIELD,
  REGISTER,
  ASYNC_END,
  ASYNC_START
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
  errorCifnif: false,
  errorEmailMensaje: "register-error-email",
  errorCifnifMensaje: "register-error-cifnif",
  loading: false
}
export default function register(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FIELD:
          state[action.field] = action.data;
            return {
                ...state,
            };
          case ASYNC_START:
              return {
                  ...state,
                  loading : true
              }
          case ASYNC_END:
              return {
                ...state,
                loading: false
              }
        case REGISTER:
          if(action.payload.error){
            if(action.payload.error.isRegistered === false){
              if(action.payload.error.errors.email){
                return {
                  ...state,
                  errorEmail: true,
                  errorEmailMensaje: "register-error-emailExist"
                }
              }
            }
            if(action.payload.error.message === "El dni introducido ya existe en la base de datos"){
              return {
                ...state,
                errorCifnif: true,
                errorCifnifMensaje: "register-error-cifnifExist"
              }
            }
          }else{
            state = initialState;
            window.location = "/";
          }
            break;
          default:
            return state;
        }
    }
