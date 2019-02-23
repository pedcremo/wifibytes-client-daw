import {Settings} from '../settings';
import fetch from 'cross-fetch';

export const GET_DATOS_ARTICULOS_BEGIN = 'GET_DATOS_ARTICULOS_BEGIN';
export const GET_DATOS_ARTICULOS_SUCCESS = 'GET_DATOS_ARTICULOS_SUCCESS';
export const GET_DATOS_ARTICULOS_FAILURE = 'GET_DATOS_ARTICULOS_FAILURE';
export const FILTER_FAMILY = 'FILTER_FAMILY';
const urls = [
  `${Settings.baseURL}/familia`,
  `${Settings.baseURL}/filtros`,
  `${Settings.baseURL}/articulo`,
];
/**
 * @desc getDatosArticulos function
 * @return {Array}
 */
export function getDatosArticulos() {
  return (dispatch) => {
    dispatch(getDatosArticulosBegin());
    return Promise.all(urls.map((u)=>fetch(u)))
        .then((responses) =>
          Promise.all(responses.map((response) => {
            return response.json();
          })))
        .then((response) => dispatch(getDatosArticulosSuccess(response)))
        .catch((error) => dispatch(getDatosArticulosFailure(error)));
  };
}

export const getDatosArticulosBegin = () => ({
  type: GET_DATOS_ARTICULOS_BEGIN,
});

export const getDatosArticulosSuccess = (datosArticulos) => ({
  type: GET_DATOS_ARTICULOS_SUCCESS,
  payload: {datosArticulos},
});

export const getDatosArticulosFailure = (error) => ({
  type: GET_DATOS_ARTICULOS_FAILURE,
  payload: {error},
});
