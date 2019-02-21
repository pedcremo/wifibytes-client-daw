import {Utils} from '../utils';

export function getDatosTarifas() {
  console.warn('getDatosTarifas');
  return (dispatch) => {
    dispatch(getDatosTarifaBegin());
    return Utils.get('/tarifa/?destacado=true')
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
