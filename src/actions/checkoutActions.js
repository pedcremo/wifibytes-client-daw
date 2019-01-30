import {Utils} from "../utils";


export const PAYMENT_SUBMIT_BEGIN = 'PAYMENT_SUBMIT_BEGIN';
export const PAYMENT_SUBMIT_SUCCESS = 'PAYMENT_SUBMIT_SUCCESS';
export const PAYMENT_SUBMIT_FAILURE = 'PAYMENT_SUBMIT_FAILURE';
export const FORM_UPDATE = 'FORM_UPDATE';
export const GET_PAYMENTS_BEGIN = 'GET_PAYMENTS_BEGIN';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE';
export const SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE';

export function getPaymentTypes() {
    return dispatch => {
        try {
            dispatch(getPaymentsBegin());
            return Utils.get("/formaspago", function(response) {
                dispatch(getPaymentsSuccess(response));
            });
        } catch (e){
            dispatch(getPaymentsFailure(e));
        }
    };
}

export function setExpirationDate(year, month) {
    return dispatch => {
        return dispatch({
            type: SET_EXPIRATION_DATE,
            year: year,
            month:month
        });
    };
}

export function paymentUpdate(key, value) {
    return dispatch => {
        return dispatch({
            type: FORM_UPDATE, 
            key: key,
            value: value
        });
    };
} 

export function paymentsubmit(payload) {
    return dispatch => {
        try {
            dispatch(paymentSubmitBegin());
            return Utils.post();
        } catch (e){
            dispatch(paymentSubmitFailure(e));
        }
    };
}

/* SUBMIT TYPES ACTIONS */
    export const paymentSubmitBegin = () => ({
        type: PAYMENT_SUBMIT_SUCCESS
    });

    export const paymentSubmitSuccess = formasdepago => ({
        type: GET_PAYMENTS_SUCCESS,
        payload: { formasdepago }
    });

    export const paymentSubmitFailure = error => ({
        type: PAYMENT_SUBMIT_FAILURE,
        payload: { error }
    });

/* GET PAYMENTS TYPES ACTIONS */
    export const getPaymentsBegin = () => ({
        type: PAYMENT_SUBMIT_BEGIN
    });

    export const getPaymentsSuccess = formasdepago => ({
        type: GET_PAYMENTS_SUCCESS,
        payload: { formasdepago }
    });

    export const getPaymentsFailure = error => ({
        type: GET_PAYMENTS_FAILURE,
        payload: { error }
    });