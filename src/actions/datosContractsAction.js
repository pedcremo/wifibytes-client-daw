import {Utils} from "../utils";

export const SEND_CONTRACT = 'SEND_CONTRACT';
export const SEND_CONTRACT_SUCCESS = 'SEND_CONTRACT_SUCCESS';
export const SEND_CONTRACT_FAILURE = 'SEND_CONTRACT_FAILURE';

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
    type: GET_DATOS_ARTICULOS_BEGIN
});

export const sendContractsSuccess = status => ({
    type: SEND_CONTRACT_SUCCESS,
    payload: { status }
});

export const sendContractsFailure = error => ({
    type: SEND_CONTRACT_FAILURE,
    payload: { error }
});
