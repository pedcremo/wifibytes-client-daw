import {Utils} from "../utils";


export const PAYMENT_SUBMIT = 'PAYMENT_SUBMIT';
export const PAYMENT_UPDATE = 'PAYMENT_UPDATE';

export function paymentUpdate(key, value) {
    return dispatch => {
        dispatch({
            type: PAYMENT_UPDATE, 
            key: {key},
            value: {value}
        });
    };
}

export function paymentsubmit(payload) {
    return dispatch => {
        dispatch({
            type: PAYMENT_SUBMIT, 
            payload
        });
    };
}




