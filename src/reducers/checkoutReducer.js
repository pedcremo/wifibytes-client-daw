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
    paymentMethod:null, /**Iremos viendo qué hacemos con esto */
    existsService:false,
    checkoutProcessIsValid:false,
    cardOwner:"",
    cardNumber:"",
    expirationMonth:"",
    expirationYear:"",
    cvv:"",
    cardNameIsValid:false,
    cardNumberIsValid:false,
    expirationDateIsValid:false,
    cvvIsValid:false
};

export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EXPIRATION_DATE:
            return {
                ...state,
                expirationYear : action.year,
                expirationMonth : action.month
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
        case FORM_UPDATE:
            return { ...state, [action.key]: action.value};
        default:
            return {...state};
    }
}