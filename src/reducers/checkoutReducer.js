import {

} from '../actions/checkoutActions';

const initialState = {
    paymentViewIsValid:false,
    paymentMethod:null, /**Iremos viendo qué hacemos con esto */
    existsService:false,
    checkoutProcessIsValid:false
};

export default function checkout(state = initialState, action) {

    switch (action.type) {
        case GET_PAYMENTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_PAYMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.formasdepago
            };
        case GET_PAYMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: []
            };
        case PAYMENT_SUBMIT:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case PAYMENT_UPDATE:
            return { ...state, [action.key]: action.value, [action.key]:false };
        default:
            return state;
    }
}