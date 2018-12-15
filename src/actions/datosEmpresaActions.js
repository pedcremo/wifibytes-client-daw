import {Utils} from "../utils";

export function getDatosEmpresa() {
    return dispatch => {
      dispatch(getDatosEmpresaBegin());
      return Utils.get("/datos_empresa")
        .then(function(response) {
          dispatch(getDatosEmpresaSuccess(response));
          return response;
        })
        .catch(error => dispatch(getDatosEmpresaFailure(error)));
    };
}
  

export const GET_DATOS_EMPRESA_BEGIN   = 'GET_DATOS_EMPRESA_BEGIN';
export const GET_DATOS_EMPRESA_SUCCESS = 'GET_DATOS_EMPRESA_SUCCESS';
export const GET_DATOS_EMPRESA_FAILURE = 'GET_DATOS_EMPRESA_FAILURE';

export const getDatosEmpresaBegin = () => ({
  type: GET_DATOS_EMPRESA_BEGIN
});

export const getDatosEmpresaSuccess = datosEmpresa => ({
  type: GET_DATOS_EMPRESA_SUCCESS,
  payload: { datosEmpresa }
});

export const getDatosEmpresaFailure = error => ({
  type: GET_DATOS_EMPRESA_FAILURE,
  payload: { error }
});