import { Utils } from '../utils';
import { Settings } from '../settings';

import fetch from 'cross-fetch';

/**
 * @desc getDatosHome function
 * @return {Array}
 */
export function getDatosHome() {
	return (dispatch) => {
		dispatch(getDatosHomeBegin());
		return fetch(`${Settings.baseURL}/home`)
			.then((response) => response.json())
			.then((data) => dispatch(getDatosHomeSuccess(Utils.filterPruneArrayByLang(data, 'lang'))))
			.catch((error) => dispatch(getDatosHomeFailure(error)));
	};
}

export const GET_DATOS_HOME_BEGIN = 'GET_DATOS_HOME_BEGIN';
export const GET_DATOS_HOME_SUCCESS = 'GET_DATOS_HOME_SUCCESS';
export const GET_DATOS_HOME_FAILURE = 'GET_DATOS_HOME_FAILURE';

export const getDatosHomeBegin = () => ({
	type: GET_DATOS_HOME_BEGIN
});

export const getDatosHomeSuccess = (datosHome) => ({
	type: GET_DATOS_HOME_SUCCESS,
	payload: { datosHome }
});

export const getDatosHomeFailure = (error) => ({
	type: GET_DATOS_HOME_FAILURE,
	payload: { error }
});
