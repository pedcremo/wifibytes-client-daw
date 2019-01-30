import {
    GET_CONTACT_DATA_FORM_BEGIN,
    GET_CONTACT_DATA_FORM_SUCCESS,
    GET_CONTACT_DATA_FORM_FAILURE,
    GET_CURRENT_CONTACT_DATA_FORM,
    GET_CONTACT_DATA_FORM_UPDATE
} from '../actions/personalDataFormActions';

const initialState = {
    fields: {},
    loaded: false,
};

export default function personalDataFormReducer(state = initialState, action) {
    
    switch (action.type) {
        case GET_CONTACT_DATA_FORM_BEGIN:
            
            return {
                ...state,
                loaded: true,
                error: null
            };

        case GET_CONTACT_DATA_FORM_SUCCESS:
            return {
                ...state,
                loaded: false,
                fields: getUserData(action)
            };

        case GET_CONTACT_DATA_FORM_UPDATE:
            return {
                ...state,
                loaded: false,
                fields: action.payload.contactDataForm
            };

        case GET_CONTACT_DATA_FORM_FAILURE:
            return {
                ...state,
                loaded: false,
                error: action.payload,
                fields: []
            };
        
        case GET_CURRENT_CONTACT_DATA_FORM:
            return {
                ...state,
                loaded: false,
                fields: state
            };

        default:
            return state;
    }
}


let getUserData = (action) => {
    //action.payload.contactDataForm
    /* hay que convertir lo que viene de backend en un objeto valido para el form */
    return {
        name: {error:"", value: "pepe"},
        surname: {error:"", value: "lopez"},
        email: {error:"", value: "lopez@gmail.com"},
        phone: {error:"", value: 654654654},
        address: {error:"", value: "C/ alicante 1"},
        zip: {error:"", value: 46870},
        city: {error:"", value: "Gandia"},
        tipcli: {error:"", value: ""},
        dni: {error:"", value: "48606013k"},
        cif: {error:"", value: "48606013k"},
        nie: {error:"", value: "48606013k"}
    }
}