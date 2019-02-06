import {
    AUTH_SET,
    NOT_AUTH,
    LOGOUT,
    GET_PROFILE
} from '../constants/actionTypes';

const initialState = {
    isAuth: false,
    user: null,
};

export default function isAuth(state = initialState, action) {
    switch (action.type) {
        case AUTH_SET:
            return {
                ...state,
                isAuth : true,
                user : action.user
            }
        case NOT_AUTH:
            return {
                ...state,
                isAuth : false,
                user : undefined
            }
        case LOGOUT : 
            return {
                ...state,
                isAuth : false,
                user : undefined
            }
        case GET_PROFILE:
            return {
                ...state,
                profile : action.payload
            }
        default:
            return state;
    }
}
