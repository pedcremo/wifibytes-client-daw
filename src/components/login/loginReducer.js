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

const initialState = {
    view: window.location.href.split('/')[4],
};
export default function login(state = initialState, action) {
    switch (action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                view : action.view,
            };
        case SHOW_RECOVER:
            return {
                ...state,
                showRecoverPass : !state.showRecoverPass,
            };
        case LOGIN_BEGIN:
            return {
                ...state,
                loading : true
            }
        case LOGIN_SUCCES:
            return {
                ...state  ,
                loading: false,
                error: false,
                loginData : action.payload.loginData
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case RECOVER_BEGIN:
            return {
                ...state,
                loadingRecover : true
            }
        case RECOVER_ERROR:
            return {
                ...state,
                loadingRecover: false,
                errorRecover: action.payload.error
            };
        case RECOVER_SUCCES:
            return {
                ...state  ,
                loadingRecover: false,
                errorRecover: false,
                recoverData : action.payload.recoverData
            }
        default:
            return state;
    }
}
