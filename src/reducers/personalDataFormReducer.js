import {
    GET_CONTACT_DATA_FORM_BEGIN,
    GET_CONTACT_DATA_FORM_SUCCESS,
    GET_CONTACT_DATA_FORM_FAILURE,
    GET_CURRENT_CONTACT_DATA_FORM,
    GET_CONTACT_DATA_FORM_UPDATE,
    UPDATE_CONTACT_DATA_FORM_SERVICES,
    UPDATE_VALID_DTOS_PERSONALES,
    GET_CONTACT_DATA_FORM_SERVICES,
} from '../actions/personalDataFormActions';

const initialState = {
    fields: {
        datosPersonales:{},
        datosProductos:[]
    },
    totalServices:0,
    validDatosPersonales: false,
    validDatosProductos:false,
    validForms:false,
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

            state.fields.datosPersonales ={
                    name: {error:"", value: "alicia"},
                    surname: {error:"", value: "lopez"},
                    email: {error:"", value: "lopez@gmail.com"},
                    address: {error:"", value: "C/ alicante 1"},
                    zip: {error:"", value: 46870},
                    city: {error:"", value: "Gandia"},
                    tipcli: {error:"", value: 0},
                    date: {error:"", value: ""},
                    preview: {error:"", value: ""},
                    dni: {error:"", value: ""},
                    cif: {error:"", value: ""},
                    nie: {error:"", value: ""}
                }
                
            return {
                ...state,
                loaded: false,
                fields: state.fields
            };

        case GET_CONTACT_DATA_FORM_UPDATE:
            state.fields["datosPersonales"] = action.payload.contactDataForm
            return {
                ...state,
                loaded: false,
                fields: state.fields
            };

        case UPDATE_CONTACT_DATA_FORM_SERVICES:
            if (!state.fields["datosProductos"]) 
                state.fields["datosProductos"]=[]
            
            let exist = state.fields["datosProductos"].filter((item)=>{return item.key == parseInt(action.payload.key)})
            
            if (exist.length == 0) {
                let obj= {
                    key: parseInt(action.payload.key),
                    value: action.payload,
                }
                state.fields["datosProductos"].push(obj)
            } else {
                state.fields["datosProductos"].filter((item) => {
                    if (item.key == parseInt(action.payload.key)) {
                        item.value=action.payload
                    }
                })
            }
                
            return {
                ...state,
                loaded: false,
                fields: state.fields
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

        case UPDATE_VALID_DTOS_PERSONALES:
            state.validDatosPersonales = true
            if (state.validDatosProductos) 
                this.validForms=true

            return {
                ...state,
            };

        case GET_CONTACT_DATA_FORM_SERVICES:
            /**tiene verificar si esiste un objeto con la key que recibe y si no existe crearlo */
            return {
                products: state.fields.datosProductos
            };

        default:
            return state;
    }
}