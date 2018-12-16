import {Utils} from "../utils";

export function getDatosFamilies() {
    return dispatch => {
      dispatch(getDatosFamiliesBegin());
      return Utils.get("/familia")
        .then(function(response) {
          dispatch(getDatosFamiliesSuccess(response));
          return response;
        })
        .catch(error => dispatch(getDatosFamiliesFailure(error)));
    };
}
  

export const GET_DATOS_FAMILIES_BEGIN   = 'GET_DATOS_FAMILIES_BEGIN';
export const GET_DATOS_FAMILIES_SUCCESS = 'GET_DATOS_FAMILIES_SUCCESS';
export const GET_DATOS_FAMILIES_FAILURE = 'GET_DATOS_FAMILIES_FAILURE';

export const getDatosFamiliesBegin = () => ({
  type: GET_DATOS_FAMILIES_BEGIN
});

export const getDatosFamiliesSuccess = datosFamilies => ({
  type: GET_DATOS_FAMILIES_SUCCESS,
  payload: { datosFamilies }
});

export const getDatosFamiliesFailure = error => ({
  type: GET_DATOS_FAMILIES_FAILURE,
  payload: { error }
});