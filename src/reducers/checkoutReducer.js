import {
    GET_PAYMENTS_BEGIN,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAILURE,
    PAYMENT_SUBMIT,
    FORM_UPDATE,
    SET_EXPIRATION_DATE
} from '../actions/checkoutActions';

const initialState = {
    paymentStepIsValid:false,
    paymentMethod:3, /**codpago de backend, visa/mastercard/american express por defecto */
    existsService:false,
    checkoutProcessIsValid:false,
    cardOwner:"",
    cardNumber:"",
    expirationMonth:"",
    expirationYear:"",
    cvv:"",
    cardNameIsValid:false, /**not using this yet, waiting for the checkout to be incorpored */
    cardNumberIsValid:false,
    expirationDateIsValid:false,
    cvvIsValid:false,
    paymentMethods:[],
    iban:"",
    address:"",
    debitOwner:"",
};

export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EXPIRATION_DATE:
            return {
                ...state,
                expirationYear : action.year,
                expirationMonth : action.month + 1 /**January starts at 0 */
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
                paymentMethod: action.payload.formasdepago.results[1].codpago
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
        case FORM_UPDATE:
            return { ...state, [action.key]: action.value};
        default:
            return {...state};
    }
}