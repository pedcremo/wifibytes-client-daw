import {Utils} from "../utils";

export const GET_DATOS_ARTICULOS_BEGIN = 'GET_DATOS_ARTICULOS_BEGIN';
export const GET_DATOS_ARTICULOS_SUCCESS = 'GET_DATOS_ARTICULOS_SUCCESS';
export const GET_DATOS_ARTICULOS_FAILURE = 'GET_DATOS_ARTICULOS_FAILURE';

export function getDatosArticulos() {
    return dispatch => {
      dispatch(getDatosArticulosBegin());
      return Promise.all([Utils.get("/familia"),Utils.get("/filtros"), Utils.get("/articulo")])
            .then(response => dispatch(getDatosArticulosSuccess(response)))
            .catch(error => dispatch(getDatosArticulosFailure(error)));
    };
}

export const getDatosArticulosBegin = () => ({
    type: GET_DATOS_ARTICULOS_BEGIN
});

export const getDatosArticulosSuccess = datosArticulos => ({
    type: GET_DATOS_ARTICULOS_SUCCESS,
    payload: { datosArticulos }
});

export const getDatosArticulosFailure = error => ({
    type: GET_DATOS_ARTICULOS_FAILURE,
    payload: { error }
});
  