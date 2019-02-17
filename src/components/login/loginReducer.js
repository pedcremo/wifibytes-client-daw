import {
  CHANGE_VIEW,
  ASYNC_START,
  LOGIN,
  RECOVER,
  CHANGE_VALUE,
  ASYNC_END
} from "../../constants/actionTypes";

const initialState = {
  view: window.location.href.split("/")[4],
  username: "",
  password: "",
  email: "",
  errorCaptcha: "",
  captcha: false
};
export default function login(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      };
    case CHANGE_VALUE:
      state[action.target] = action.value;
      return {
        ...state
      };
    case ASYNC_START:
      return {
        ...state,
        loading: true
      };
    case ASYNC_END:
      return {
        ...state,
        loading: false
      };
    case LOGIN:
      return {
        ...state,
        loading: false,
        error: action.error,
        loginData: action.payload.loginData
      };
    case RECOVER:
      return {
        ...state,
        loadingRecover: false,
        messageRecover: action.payload.error
          ? action.payload.error.message
          : action.payload.message,
        recoverData: action.payload.recoverData
      };
    default:
      return state;
  }
}
