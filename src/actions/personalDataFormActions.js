import {
    Utils
} from "../utils";

export function getContactDataForm() {
    console.warn("getContactDataForm")
    return dispatch => {
        dispatch(getContactDataFormBegin());
        return Utils.get("/tarifa/?destacado=true")
            .then(function (response) {
                dispatch(getContactDataFormSuccess(response));
                return response;
            })
            .catch(error => dispatch(getContactDataFormFailure(error)));
    };
}

export function updateContactDataForm(newData) {
    console.log("updateContactDataFormDatosPersonales", newData)
    return dispatch => dispatch(updateContactDataFormSuccess(newData));
}

export function updateContactDataFormServices(newData) {
    return dispatch => dispatch(updateServices(newData));
}

export function getCurrentContactDataForm() {
    return dispatch => dispatch(getCurrentContactDataFormSuccess());
}

export function updateValidDtoPersForm() {
    return dispatch => dispatch(updateValidDatosPersonales());
}

export function getContactDataFormServices() {
    return dispatch => dispatch(getContactDataFormServicesB());
}

export const GET_CONTACT_DATA_FORM_BEGIN = 'GET_CONTACT_DATA_FORM_BEGIN';
export const GET_CONTACT_DATA_FORM_SUCCESS = 'GET_CONTACT_DATA_FORM_SUCCESS';
export const GET_CONTACT_DATA_FORM_FAILURE = 'GET_CONTACT_DATA_FORM_FAILURE';
export const GET_CURRENT_CONTACT_DATA_FORM = 'GET_CURRENT_CONTACT_DATA_FORM';
export const GET_CONTACT_DATA_FORM_UPDATE = 'GET_CONTACT_DATA_FORM_UPDATE';
export const UPDATE_CONTACT_DATA_FORM_SERVICES = 'UPDATE_CONTACT_DATA_FORM_SERVICES';
export const UPDATE_VALID_DTOS_PERSONALES = 'UPDATE_VALID_DTOS_PERSONALES';
export const GET_CONTACT_DATA_FORM_SERVICES = 'GET_CONTACT_DATA_FORM_SERVICES';

export const getContactDataFormServicesB = (items) => ({
    type: GET_CONTACT_DATA_FORM_SERVICES,
    payload: items
});

export const updateValidDatosPersonales = () => ({
    type: UPDATE_VALID_DTOS_PERSONALES
});

export const updateServices = productos => ({
    type: UPDATE_CONTACT_DATA_FORM_SERVICES,
    payload: productos
});


export const updateContactDataFormSuccess = contactDataForm => ({
    type: GET_CONTACT_DATA_FORM_UPDATE,
    payload: {
        contactDataForm
    }
});

export const getContactDataFormBegin = () => ({
    type: GET_CONTACT_DATA_FORM_BEGIN
});

export const getContactDataFormSuccess = contactDataForm => ({
    type: GET_CONTACT_DATA_FORM_SUCCESS,
    payload: {
        contactDataForm
    }
});

export const getContactDataFormFailure = error => ({
    type: GET_CONTACT_DATA_FORM_FAILURE,
    payload: {
        error
    }
});

export const getCurrentContactDataFormSuccess = () => ({
    type: GET_CURRENT_CONTACT_DATA_FORM,
    payload
});