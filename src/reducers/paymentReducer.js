import {
    GET_PAYMENTS_BEGIN,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAILURE,
    PAYMENT_SUBMIT,
    SET_SHOW_MODAL_TRUE,
    SET_SHOW_MODAL_FALSE,
    SET_FORM,
    PAYMENT_METHOD_UPDATE
} from '../actions/paymentActions';

const initialState = {
    paymentMethod:0, /**codpago de backend, visa/mastercard/american express por defecto */
    paymentMethods:[],
    showModal:false,
    form:[],
    /** submittedAtLeastOnce it's true if payment form was submitted even if it had errors */
    submittedAtLeastOnce:true, 
    /**
    * It's true if payment form was submitted even if it had errors */
};

export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case PAYMENT_METHOD_UPDATE:
            return{
                ...state,
                paymentMethod : action.value === 2? 3 : action.value
            }
        case SET_FORM:
            return {
                ...state,
                form:action.form
            }
        case SET_SHOW_MODAL_TRUE:
            return{
                ...state,
                showModal:true
            }
        case SET_SHOW_MODAL_FALSE:
            return{
                ...state,
                showModal:false
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
        case PAYMENT_SUBMIT:
            return {
                ...state,
                loading: false,
                payment: action.value,
            };
        default:
            return {...state};
    }
}