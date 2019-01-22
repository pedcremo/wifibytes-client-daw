import {Utils} from "../utils";


export const PAYMENT_SUBMIT = 'PAYMENT_SUBMIT';
export const FORM_UPDATE = 'FORM_UPDATE';
export const GET_PAYMENTS_BEGIN = 'GET_PAYMENTS_BEGIN';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE';

export function getPaymentTypes() {
    return dispatch => {
        dispatch(getPaymentsBegin());
        return Utils.get("/formaspago")
        .then(function(response) {
            dispatch(getPaymentsSuccess(response));
            return response;
            })
            .catch(error => dispatch(getPaymentsFailure(error)));
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

// export function paymentsubmit(payload) {
//     return dispatch => {
//         dispatch({
//             type: PAYMENT_SUBMIT, 
//             payload
//         });
//     };
// }


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