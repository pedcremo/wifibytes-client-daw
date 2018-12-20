import {Utils} from "../utils";

export const GET_RATES_BEGIN = 'GET_RATES_BEGIN';
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS';
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE';

export const getRatesBegin = () => ({
    type: GET_RATES_BEGIN
});

export const getRatesSuccess = rates => ({
    type: GET_RATES_SUCCESS,
    payload: {
        rates
    }
});

export const getRatesFailure = error => ({
    type: GET_RATES_FAILURE,
    payload: {
        error
    }
});


export function getRates() {
    return dispatch => {
      dispatch(getRatesBegin());
      return Promise.all([Utils.get("/tarifa/?activo=true"), Utils.get("/tarifa_descriptor")])
            .then(response => dispatch(getRatesSuccess(response)))
            .catch(error => dispatch(getRatesFailure(error)));
    };
}
  
