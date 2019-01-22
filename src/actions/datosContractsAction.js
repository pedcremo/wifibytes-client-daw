import {Utils} from "../utils";

export const SEND_CONTRACT_BEGIN = 'SEND_CONTRACT_BEGIN';
export const SEND_CONTRACT_SUCCESS = 'SEND_CONTRACT_SUCCESS';
export const SEND_CONTRACT_FAILURE = 'SEND_CONTRACT_FAILURE';

export const GET_CONTRACT_BEGIN = 'GET_CONTRACT_BEGIN';
export const GET_CONTRACT_SUCCESS = 'GET_CONTRACT_SUCCESS';
export const GET_CONTRACT_FAILURE = 'GET_CONTRACT_FAILURE';


/**Get the contracts */

export function getDatosContracts(){
    console.log("ARRIBA ESPAÑA");
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

export function sendContractsActiondHtml(html) {
    console.log(html);
    return dispatch => {
      dispatch(sendContractsBegin());
      return Utils.post("/contratos" + html)
            .then(response => dispatch(sendContractsSuccess(response)))
            .catch(error => dispatch(sendContractsFailure(error)));
    };
}

export const sendContractsBegin = () => ({
    type: SEND_CONTRACT_BEGIN
});

export const sendContractsSuccess = status => ({
    type: SEND_CONTRACT_SUCCESS,
    payload: { status }
});

export const sendContractsFailure = error => ({
    type: SEND_CONTRACT_FAILURE,
    payload: { error }
});

