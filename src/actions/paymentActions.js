import {Utils} from "../utils";


export const GET_PAYMENTS_BEGIN = 'GET_PAYMENTS_BEGIN';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE';
export const PAYMENT_METHOD_UPDATE = 'PAYMENT_METHOD_UPDATE';
export const UPDATE_FIELD = 'UPDATE_FIELD';

import { UPDATE_DATA, SET_COMPLETED, SET_UNCOMPLETED } from '../constants/actionTypes';

export function updateData(key, data) {
    return dispatch => {
        return dispatch({
            type: UPDATE_DATA,
            payload: {key, data}
        });
    };
}

export function fieldUpdate(field, value) {
    return dispatch => {
        return dispatch({
            type: UPDATE_FIELD,
            field: field,
            value: value
        });
    };
}

export const setCompleted = () => ({
    type: SET_COMPLETED
});

export const setUncompleted = () => ({
    type: SET_UNCOMPLETED
});

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