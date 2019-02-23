import {Settings} from '../settings';

import fetch from 'cross-fetch';

/**
 * @desc getDatosEmpresa function
 * @return {Array}
 */
export function getDatosEmpresa() {
  return (dispatch) => {
    dispatch(getDatosEmpresaBegin());
    return fetch(`${Settings.baseURL}/datos_empresa`)
        .then((response) => response.json())
        .then((data) => dispatch(getDatosEmpresaSuccess(data)))
        .catch((error) => dispatch(getDatosEmpresaFailure(error)));
  };
}


export const GET_DATOS_EMPRESA_BEGIN = 'GET_DATOS_EMPRESA_BEGIN';
export const GET_DATOS_EMPRESA_SUCCESS = 'GET_DATOS_EMPRESA_SUCCESS';
export const GET_DATOS_EMPRESA_FAILURE = 'GET_DATOS_EMPRESA_FAILURE';

export const getDatosEmpresaBegin = () => ({
  type: GET_DATOS_EMPRESA_BEGIN,
});

export const getDatosEmpresaSuccess = (datosEmpresa) => ({
  type: GET_DATOS_EMPRESA_SUCCESS,
  payload: {
    datosEmpresa,
  },
});

export const getDatosEmpresaFailure = (error) => ({
  type: GET_DATOS_EMPRESA_FAILURE,
  payload: {
    error,
  },
});
