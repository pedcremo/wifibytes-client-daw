import {
    GET_CONTACT_DATA_FORM_BEGIN,
    GET_CONTACT_DATA_FORM_SUCCESS,
    GET_CONTACT_DATA_FORM_FAILURE,
    GET_CURRENT_CONTACT_DATA_FORM,
    GET_CONTACT_DATA_FORM_UPDATE,
    UPDATE_CONTACT_DATA_FORM_SERVICES,
    UPDATE_VALID_DTOS_PERSONALES,
    GET_CONTACT_DATA_FORM_SERVICES,
    UPDATE_DATOS_PRODUCTOS,
    GET_VALIDA_FORMS,

    GET_DATOS_PERSONALES,
    UPDATE_DATOS_PERSONALES
} from '../actions/personalDataFormActions';
import {
    Utils
} from "../utils";
const initialState = {
    fields: {
        datosPersonales:{},
        datosProductos:[]
    },
    datosPersonales:{},
    totalServices:0,
    validDatosPersonales: false,
    validDatosProductos:false,
    validForms:false,
    loaded: false,
};

/* localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData'); */

export default function personalDataFormReducer(state = initialState, action) {
    
    switch (action.type) {

        case UPDATE_DATOS_PERSONALES:
            console.log("action.field", action.field, action.data)
            state.datosPersonales[action.field] = action.data;
            return {
                ...state,
            };

        case GET_DATOS_PERSONALES:
            let token = Utils.getCookie("jwt");
            localStorage.setItem('myData', data);

            
            localStorage.getItem('myData');

            state.datosPersonales[action.field] = action.data;
            return {
                ...state,
            };
















        case UPDATE_DATOS_PRODUCTOS:
            state.fields["datosProductos"] = action.payload
            state.validDatosProductos = true
            return {
                ...state,
                loaded: false,
                fields: state.fields
            };

        case GET_CONTACT_DATA_FORM_BEGIN:
            
            return {
                ...state,
                loaded: true,
                error: null
            };

        case GET_CONTACT_DATA_FORM_SUCCESS:
        //console.log(Object.keys(state.fields.datosPersonales).length)
        if (Object.keys(state.fields.datosPersonales).length ==0 ) {
                state.fields.datosPersonales ={
                        name:  "a",
                        surname:  "lopez",
                        email:  "lopez@gmail.com",
                        address:  "C/ alicante 1",
                        zip:  46870,
                        city:  "Gandia",
                        cuenta:  "",
                        date:  "",
                        //preview:  "", 
                        tipcli:  0,
                        /* nie:  "",
                        dni:  ""},
                        cif:  ""}, */
                    }
            }
                
            return {
                ...state,
                loaded: false,
                fields: state.fields
            };

        case GET_CONTACT_DATA_FORM_UPDATE:
            const object = action.payload.contactDataForm
            let valid=true;
            state.fields["datosPersonales"] = object
            console.log("state.fields[datosPersonales]", object)
            for (const key in object) {
                if (object[key].hasOwnProperty("error") && object[key]["error"] != false && object[key]["error"] != undefined) {
                    valid = false;
                    break;
                }
            }
            state.validDatosPersonales = valid
            
            /* if (state.validDatosPersonales && state.validDatosProductos) 
                state.validForms=true
            else
                state.validForms = false */
            //validar
            return {
                ...state,
                loaded: false,
                fields: state.fields
            };

        case UPDATE_CONTACT_DATA_FORM_SERVICES:
            if (!state.fields["datosProductos"]) 
                state.fields["datosProductos"]=[]
                
            state.validDatosProductos = false
            let exist = state.fields["datosProductos"].filter((item)=>{return item.key == parseInt(action.payload.key)})
            
            if (exist.length == 0) {
                let obj= {
                    key: parseInt(action.payload.key),
                    value: action.payload,
                }
                state.fields["datosProductos"].push(obj)
                
            } else {
                state.fields["datosProductos"].filter((item) => {
                    /**
                     * Filtro del el objeto datosProductos por medio de su key
                     * Este objeto contiene la informacion de las tarifas de altas y portabilidades que tiene el carrito
                     */
                    if (item.key == parseInt(action.payload.key)) {
                        /**
                         * Si tiene tipo lo cambia y si fuese necesario elimina la propiedad values, ya que si cambia alta se tienen que eliminar los datos
                         */
                        if (action.payload.tipo) {
                            item.tipo = action.payload.tipo
                            if (item.hasOwnProperty("value")) {
                                delete item.value
                            }
                            if (item.tipo==="alta") {
                                item.valido=true
                            }else{
                                item.valido = false
                            }
                        }
                        /**
                         * Si el objeto que recive del action.payload viene con contenido cambia el objeto de redux con el nuevo contenido
                         */
                        if (action.payload.name) {
                            delete action.payload.key
                            let name = action.payload.name
                            delete action.payload.name
                            //console.log(action.payload[name])
                            if (!item.value) {
                                item.value={}
                            }
                            item.value[name] = action.payload[name]

                        }


                        if (item.tipo === "portabilidad" && item.hasOwnProperty("value")) {
                            if (item.tipoTlf==="fijo") {
                                let object = item.value
                                if (Object.keys(object).length === 2) {
                                    //console.log(object)
                                    let valid = true
                                    //console.log(valid)
                                    for (const key in object) {
                                        if (object[key].hasOwnProperty("error") && object[key]["error"] != undefined) {
                                            valid = false;
                                            break;
                                        }
                                    }
                                    //console.log(valid)
                                    item.valido = valid
                                }
                            }
                            if (item.tipoTlf==="movil") {
                                let object = item.value
                                if (Object.keys(object).length === 3) {
                                    //console.log(object)
                                    let valid = true
                                    //console.log(valid)
                                    for (const key in object) {
                                        if (object[key].hasOwnProperty("error") && object[key]["error"]!=undefined) {
                                            valid = false;
                                            break;
                                        }
                                    }
                                    //console.log(valid)
                                    item.valido = valid
                                }
                            }
                        }
                    }
                })

                let arrayValidados = state.fields["datosProductos"].filter((item)=>{
                    if(item.valido){
                        return item
                    }
                })
                //console.log(arrayValidados.length, state.fields["datosProductos"].length)
                if (arrayValidados.length === state.fields["datosProductos"].length) {
                    state.validDatosProductos = true
                }
                
                
            }

            /* if (state.validDatosPersonales === true && state.validDatosProductos === true)
                state.validForms = true
            else
                state.validForms = false */

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
        case GET_VALIDA_FORMS:
            let formsValids
            if (state.validDatosPersonales && state.validDatosProductos)
                formsValids = true
            else
                formsValids = false
            //console.log(formsValids, "formsValids")

            return {
                ...state,
                validForms: formsValids
            };

        default:
            return state;
    }
}


function iteraObject(object){

    return "errores"
}