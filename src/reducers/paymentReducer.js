import {
    GET_PAYMENTS_BEGIN,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAILURE,
    PAYMENT_METHOD_UPDATE
} from '../actions/paymentActions';

const initialState = {
    paymentMethod:0, /**codpago de backend, visa/mastercard/american express por defecto */
    paymentMethods:[],
};

export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case PAYMENT_METHOD_UPDATE:
            return{
                ...state,
                paymentMethod : action.value
            }
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
                paymentMethods: action.payload.formasdepago.results,
                paymentMethod: action.payload.formasdepago.results[2].codpago
            };
        case GET_PAYMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return {...state};
    }
}