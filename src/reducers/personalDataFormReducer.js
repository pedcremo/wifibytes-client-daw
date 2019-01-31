import {
    GET_CONTACT_DATA_FORM_BEGIN,
    GET_CONTACT_DATA_FORM_SUCCESS,
    GET_CONTACT_DATA_FORM_FAILURE,
    GET_CURRENT_CONTACT_DATA_FORM,
    GET_CONTACT_DATA_FORM_UPDATE,
    UPDATE_CONTACT_DATA_FORM_SERVICES
} from '../actions/personalDataFormActions';

const initialState = {
    fields: {
        datosPersonales:{},
        datosProductos:[]
    },
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
                    phone: {error:"", value: 654654654},
                    address: {error:"", value: "C/ alicante 1"},
                    zip: {error:"", value: 46870},
                    city: {error:"", value: "Gandia"}        
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
            console.log("state.fields",state.fields)
            if (!state.fields["datosProductos"]) 
                state.fields["datosProductos"]=[]
            
            let exist = state.fields["datosProductos"].filter((item)=>{return item.key == action.payload.key})
            console.log("exist, state.fields",exist, state.fields)
            
            if (exist.length == 0) {
                console.log("IF -----------exist.length == 0")
                let obj= {
                    key: action.payload.key,
                    value: action.payload,
                }
                state.fields["datosProductos"].push(obj)
            } else {
                console.log("ELSE-----------  exist.length == 0", action.payload, state)
                state.fields["datosProductos"].filter((item) => {
                    if (item.key == action.payload.key) {
                        item.value=action.payload
                    }
                })
                console.log("------------", action.payload, state)
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
        tipcli: {error:"", value: "0"},
        dni: {error:"", value: "48606013k"},
        cif: {error:"", value: "48606013k"},
        nie: {error:"", value: "48606013k"}
    }
}