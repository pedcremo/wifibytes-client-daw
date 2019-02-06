import {Utils} from "../utils";


export const PAYMENT_SUBMIT = 'PAYMENT_SUBMIT';
export const GET_PAYMENTS_BEGIN = 'GET_PAYMENTS_BEGIN';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE';
export const SET_SHOW_MODAL_TRUE = 'SET_SHOW_MODAL_TRUE';
export const SET_SHOW_MODAL_FALSE = 'SET_SHOW_MODAL_FALSE';
export const SET_FORM = 'SET_FORM';
export const PAYMENT_METHOD_UPDATE = 'PAYMENT_METHOD_UPDATE';

export function getPaymentTypes() {
    return dispatch => {
        dispatch(getPaymentsBegin());
        return Utils.get("/formaspago")
        .then(response => dispatch(getPaymentsSuccess(response)))
        .catch(error => dispatch(getPaymentsFailure(error)));
    };
}

export function paymentUpdate(value) {
    return dispatch => {
        return dispatch({
            type: PAYMENT_METHOD_UPDATE,
            value: value
        });
    };
} 


/* GET PAYMENTS TYPES ACTIONS */
    export const getPaymentsBegin = () => ({
        type: GET_PAYMENTS_BEGIN
    });

    export const getPaymentsSuccess = formasdepago => ({
        type: GET_PAYMENTS_SUCCESS,
        payload: { formasdepago }
    });

    export const getPaymentsFailure = error => ({
        type: GET_PAYMENTS_FAILURE,
        payload: { error }
    });