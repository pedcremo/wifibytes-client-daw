import {Utils} from '../../utils'
import {
    CHANGE_VIEW,
    LOGIN,
    RECOVER,
    CHANGE_VALUE
}from '../../constants/actionTypes'

export const changeView = (view)=>({
    type:CHANGE_VIEW,
    view
})

export const changeValue = (value , target) => ({
    type : CHANGE_VALUE,
    value,
    target
})

/**
 * Login
 */

export function login(loginData) {
    return dispatch => {
      dispatch({
          type : LOGIN,
          payload : Utils.post("/api-token-auth/",loginData)
      })
    };
}
/**
 * Recover Pass
 */
export function recoverPass(recoverData) {
    return dispatch => {
        dispatch({
            type : RECOVER,
            payload : Utils.post("/clientenoreg/",recoverData)
        })
      };
}