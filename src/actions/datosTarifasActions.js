import {Settings} from '../settings';
import fetch from 'cross-fetch';

/**
 * @desc getDatosTarifas function
 * @return {Array}
 */
export function getDatosTarifas() {
  return (dispatch) => {
    dispatch(getDatosTarifaBegin());
    return fetch(`${Settings.baseURL}/tarifa/?destacado=true`)
        .then((response) => response.json())
        .then(function(response) {
          dispatch(getDatosTarifaSuccess(response));
          return response;
        })
        .catch((error) => dispatch(getDatosTarifaFailure(error)));
  };
}


export const GET_DATOS_TARIFA_BEGIN = 'GET_DATOS_TARIFA_BEGIN';
export const GET_DATOS_TARIFA_SUCCESS = 'GET_DATOS_TARIFA_SUCCESS';
export const GET_DATOS_TARIFA_FAILURE = 'GET_DATOS_TARIFA_FAILURE';

export const getDatosTarifaBegin = () => ({
  type: GET_DATOS_TARIFA_BEGIN,
});

export const getDatosTarifaSuccess = (datosTarifa) => ({
  type: GET_DATOS_TARIFA_SUCCESS,
  payload: {datosTarifa},
});

export const getDatosTarifaFailure = (error) => ({
  type: GET_DATOS_TARIFA_FAILURE,
  payload: {error},
});
