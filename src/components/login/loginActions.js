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
    target,
})

/**
 * Login
 */

export const login = (loginData) =>({
    type : LOGIN,
    payload : Utils.post("/api-token-auth/",loginData),
    isAuth : true
})
/**
 * Recover Pass
 */

export const recoverPass = ( email) => ({
    type : RECOVER,
    payload : Utils.post("/clientenoreg/",{email: email})
})