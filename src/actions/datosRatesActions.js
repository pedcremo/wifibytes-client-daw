import {Settings} from '../settings';
import fetch from 'cross-fetch';

export const GET_RATES_BEGIN = 'GET_RATES_BEGIN';
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS';
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE';

export const getRatesBegin = () => ({
  type: GET_RATES_BEGIN,
});

export const getRatesSuccess = (rates) => ({
  type: GET_RATES_SUCCESS,
  payload: {
    rates,
  },
});

export const getRatesFailure = (error) => ({
  type: GET_RATES_FAILURE,
  payload: {
    error,
  },
});

const urls = [
  `${Settings.baseURL}/tarifa/?activo=true`,
  `${Settings.baseURL}/tarifa_descriptor`,
];
/**
 * @desc getRates function
 * @return {Array}
 */
export function getRates() {
  return (dispatch) => {
    dispatch(getRatesBegin());
    return Promise.all(urls.map((u)=>fetch(u)))
        .then((responses) =>
          Promise.all(responses.map((response) => {
            response.headers.url===`${Settings.baseURL}/tarifa_descriptor`?
              response = Utils.filterPruneArrayByLang(response.json(), 'lang'):
              response = response.json();
            return response;
          })))
        .then((response) => dispatch(getRatesSuccess(response)))
        .catch((error) => dispatch(getRatesFailure(error)));
  };
}

