import {Utils} from '../../utils'
import {
    CHANGE_VIEW,
    LOGIN_BEGIN,
    LOGIN_SUCCES,
    LOGIN_ERROR,
    SHOW_RECOVER,
    RECOVER_BEGIN,
    RECOVER_ERROR,
    RECOVER_SUCCES
}from '../../constants/actionTypes'

export const changeView = (view)=>({
    type:CHANGE_VIEW,
    view
})
export const showRecover = ()=>({
    type:SHOW_RECOVER
})

/**
 * Login
 */
export const login_BEGIN = () =>({
    type:LOGIN_BEGIN,
})
export const login_SUCCES = (loginData) =>({
    type:LOGIN_SUCCES,
    payload : {
        loginData
    }
})
export const login_ERROR = (error) =>({
    type:LOGIN_ERROR,
    payload : {
        error
    }
})

export function login(loginData) {
    return dispatch => {
      dispatch(login_BEGIN());
      return Utils.post("/api-token-auth/",loginData)
            .then(response => dispatch(login_SUCCES(response)))
            .catch(error => dispatch(login_ERROR(error)));
    };
}
/**
 * Recover Pass
 */
export const recoverPass_BEGIN = () =>({
    type:RECOVER_BEGIN,
})
export const recoverPass_SUCCES = (recoverData) =>({
    type:RECOVER_SUCCES,
    payload : {
        recoverData
    }
})
export const recoverPass_ERROR = (error) =>({
    type:RECOVER_ERROR,
    payload : {
        error
    }
})

export function recoverPass(recoverData) {
    return dispatch => {
      dispatch(recoverPass_BEGIN());
      return Utils.post("/clientenoreg/",recoverData)
            .then(response => dispatch(recoverPass_SUCCES(response)))
            .catch(error => dispatch(recoverPass_ERROR(error)));
    };
}