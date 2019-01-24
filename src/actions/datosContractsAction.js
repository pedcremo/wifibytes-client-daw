import {Utils} from "../utils";

export const GET_CONTRACT_BEGIN = 'GET_CONTRACT_BEGIN';
export const GET_CONTRACT_SUCCESS = 'GET_CONTRACT_SUCCESS';
export const GET_CONTRACT_FAILURE = 'GET_CONTRACT_FAILURE';

export const SEND_CONTRACT = 'SEND_CONTRACT';

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


/**Send the contracts signed */

export const sendContractsAction = html => ({
    type: SEND_CONTRACT,
    payload: {
        html
    }
});