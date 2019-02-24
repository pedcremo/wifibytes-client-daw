import {Settings} from '../settings';

import fetch from 'cross-fetch';

export const GET_PAYMENTS_BEGIN = 'GET_PAYMENTS_BEGIN';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE';
export const PAYMENT_METHOD_UPDATE = 'PAYMENT_METHOD_UPDATE';
export const UPDATE_FIELD = 'UPDATE_FIELD';

import {UPDATE_DATA, SET_COMPLETED, SET_UNCOMPLETED}
  from '../constants/actionTypes';

/** Exported function to payment that has
   * @param {string} key is 'payment' in order to checkout detect that
   * is from payment component
   * @param {Object} data is the data from payment
   * @return {Object} a dispatch to the reducer
   */
export function updateData(key, data) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_DATA,
      payload: {key, data},
    });
  };
}
/** Exported function to payment that has
   * @param {string} field is the field to be updated
   * @param {string} value is the value that will fit in that field
   * @return {Object} a dispatch to the reducer
   */
export function fieldUpdate(field, value) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_FIELD,
      field: field,
      value: value,
    });
  };
}

export const setCompleted = () => ({
  type: SET_COMPLETED,
});

export const setUncompleted = () => ({
  type: SET_UNCOMPLETED,
});

/** Exported function to payment that
 * @return {Object} a dispatch to the reducer
 * in order to obtain paymentMethods from backend
  */
export function getPaymentTypes() {
  return (dispatch) => {
    dispatch(getPaymentsBegin());
    return fetch(`${Settings.baseURL}/formaspago`)
        .then((response) => response.json())
        .then((response) => dispatch(getPaymentsSuccess(response)))
        .catch((error) => dispatch(getPaymentsFailure(error)));
  };
}

/** Exported function to payment that has
 * @param {string} value that is the value that will be updated
 * @return {Object} a dispatch to the reducer
  */
export function paymentUpdate(value) {
  return (dispatch) => {
    return dispatch({
      type: PAYMENT_METHOD_UPDATE,
      value: value,
    });
  };
}


/* GET PAYMENTS TYPES ACTIONS */
export const getPaymentsBegin = () => ({
  type: GET_PAYMENTS_BEGIN,
});

export const getPaymentsSuccess = (formasdepago) => ({
  type: GET_PAYMENTS_SUCCESS,
  payload: {formasdepago},
});

export const getPaymentsFailure = (error) => ({
  type: GET_PAYMENTS_FAILURE,
  payload: {error},
});
