import {Utils} from "../utils";

export const GET_CONTRACT_BEGIN = 'GET_CONTRACT_BEGIN';
export const GET_CONTRACT_SUCCESS = 'GET_CONTRACT_SUCCESS';
export const GET_CONTRACT_FAILURE = 'GET_CONTRACT_FAILURE';

import {
    UPDATE_DATA,
    SET_COMPLETED,
    SET_UNCOMPLETED
  } from '../constants/actionTypes';
/**Get the contracts */

export function getDatosContracts(){
    return dispatch => {
        dispatch(getContractsBegin());
        return Utils.get("/textos_contratos")
        .then(response => {dispatch(getContractsSuccess(response)); return response;})
        .catch(error => dispatch(getContractsFailure(error)));
    }
}

export const getContractsBegin = () => ({
    type: GET_CONTRACT_BEGIN
});

export const getContractsSuccess = status => ({
    type: GET_CONTRACT_SUCCESS,
    payload: { status }
});

export const getContractsFailure = error => ({
    type: GET_CONTRACT_FAILURE,
    payload: { error }
});

export function updateData(key, data) {
    return dispatch => {
        return dispatch({
            type: UPDATE_DATA,
            payload: {key, data}
        });
    };
}

export const setCompleted = () => ({
    type: SET_COMPLETED
});

export const setUncompleted = () => ({
    type: SET_UNCOMPLETED
});