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
export function setForm(form) {
    return dispatch => {
        return dispatch({
            type: SET_FORM,
            form:form
        });
    };
}

export function setShowModalToTrue() {
    return dispatch => {
        return dispatch({
            type: SET_SHOW_MODAL_TRUE
        });
    };
}

export function setShowModalToFalse() {
    return dispatch => {
        return dispatch({
            type: SET_SHOW_MODAL_FALSE
        });
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

export function paymentsubmit(data) {
    let payment = {
        cardOwner:data.cardNumber,
        cardNumber:data.cardNumber,
        expirationMonth:data.expirationMonth,
        expirationYear:data.expirationYear,
        cvv:data.cvv,
        iban:data.iban,
        address:data.address,
        debitOwner:data.debitOwner
    }
    return dispatch => {
        return dispatch({
            type: PAYMENT_SUBMIT, 
            value: payment
        });
    }
}

/* SUBMIT TYPES ACTIONS */
    export const paymentSubmitBegin = () => ({
        type: PAYMENT_SUBMIT_SUCCESS
    });

    export const paymentSubmitSuccess = formasdepago => ({
        type: PAYMENTS_SUBMIT_SUCCESS,
        payload: { formasdepago }
    });

    export const paymentSubmitFailure = error => ({
        type: PAYMENT_SUBMIT_FAILURE,
        payload: { error }
    });

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