import {
    Utils
} from "../utils";

import {
    UPDATE_DATA,
    SET_COMPLETED,
    SET_UNCOMPLETED
} from '../constants/actionTypes';

/**
 * CHECKOUT ACTIONS
 */
export const setCompleted = () => ({
    type: SET_COMPLETED
});
export const setUncompleted = () => ({
    type: SET_UNCOMPLETED
});



export const UPDATE_DATOS_PERSONALES = 'UPDATE_DATOS_PERSONALES';
export const updateField = (data, field, error) => {
    console.log("ACTION UPDATE_DATOS_PERSONALES", data, field, error);
    return({
        type: UPDATE_DATOS_PERSONALES,
        data,
        field,
        error
    })
}


export const INITIALIZE_DATOS_PERSONALES = 'INITIALIZE_DATOS_PERSONALES';
export const initDatosPersonales = data => {
    console.log("ACTION INITIALIZE_DATOS_PERSONALES", data);
    return ({
        type: INITIALIZE_DATOS_PERSONALES,
        data
    })
}



