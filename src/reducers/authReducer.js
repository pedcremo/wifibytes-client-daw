import {
    AUTH_SET,
    NOT_AUTH
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
                user : null
            }
        default:
            return state;
    }
}
