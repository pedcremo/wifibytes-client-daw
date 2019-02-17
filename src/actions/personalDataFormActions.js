import {
    Utils
} from "../utils";

import {
    UPDATE_DATA,
    SET_COMPLETED,
    SET_UNCOMPLETED,
    GET_ITEMS,
    SET_LOCALSTORAGE
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


export const getItems = () => ({
    type: GET_ITEMS,
    reducer: "cartReducer",
    localStorageGet: true,
    action: SET_LOCALSTORAGE
});



export const INIT_DATA_SERVICES = 'INIT_DATA_SERVICES';
export const initDataServices = (data) => {
    console.log("ACTION INIT_DATA_SERVICES", data);
    return ({
        type: INIT_DATA_SERVICES,
        data
    })
}

export const UPDATE_DATOS_PERSONALES = 'UPDATE_DATOS_PERSONALES';
export const updateField = (data, field, error) => {
    //console.log("ACTION UPDATE_DATOS_PERSONALES", data, field, error);
    return({
        type: UPDATE_DATOS_PERSONALES,
        data,
        field,
        error
    })
}


export const INITIALIZE_DATOS_PERSONALES = 'INITIALIZE_DATOS_PERSONALES';
export const initDatosPersonales = data => {
    //console.log("ACTION INITIALIZE_DATOS_PERSONALES", data);
    return ({
        type: INITIALIZE_DATOS_PERSONALES,
        data
    })
}



