import { 
    INITIALIZE_DATOS_PERSONALES,
    UPDATE_DATOS_PERSONALES
} from '../actions/personalDataFormActions';
 import {validator}  from "../components/checkout/childComponents/personalData/validation";


const initialState = {
    datosPersonales: {
        apellido: "",
        birthday_omv: "",
        cifnif: "",
        codcliente: "",
        email: "",
        nombre: "",
        telefono: "",
        tipo_cliente:"",
        direccion:"",
        codpostal:"",
        ciudad:"",
        cuenta:""
    },
    erroresDatosPersonales: {
        apellido: "",
        birthday_omv: "",
        cifnif: "",
        codcliente: "",
        email: "",
        nombre: "",
        telefono: "",
        tipo_cliente:"",
        direccion:"",
        codpostal: "",
        ciudad:"",
        cuenta:""
    },
    validDatosPersonales: false,

    datosProductos:[],
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
            console.log("action.field", action.field, action.data, action.error);
            let errdatosPersonalesOb;
            /**
             * Actualiza los campos dentro del datosPersonales y erroresDatosPersonales en el storage de redux
             */
            state["datosPersonales"][action.field] = action.data;
            state["erroresDatosPersonales"][action.field] = action.error;
            /**
             * Verificamos si el formulario ya es valido y de ser asi le cambiamos a true validDatosPersonales
             */
            errdatosPersonalesOb = validDatosPersonalesFun(state["datosPersonales"], state["erroresDatosPersonales"])
            state["validDatosPersonales"] = errdatosPersonalesOb.valid;
            /**
             * Guarda en local los cambios realizados
             */
            localStorage.setItem('personalDataInfo', JSON.stringify(state));
            return {
                ...state,
            };



        case INITIALIZE_DATOS_PERSONALES:

            const info = JSON.parse(localStorage.getItem('personalDataInfo'));
            let datosPersonalesObject, errdatosPersonalesObject;
            console.log("REDUCER INITIALIZE_DATOS_PERSONALES", info, typeof(info));
            /**
             * Comprueba si el local hay guardados datos de la ultima visita del usuario al formulario
             */
            if (info && typeof (info) === "object" && info != null && Object.keys(info.datosPersonales).length > 0)
                datosPersonalesObject = info.datosPersonales ? info.datosPersonales : initialState.datosPersonales;            
            else
                datosPersonalesObject = action.data;


            
            /**
             * Valida si el form esta completo correctamente y cambia el objeto de errores de datos personales del state REDUX
             */
            errdatosPersonalesObject = validDatosPersonalesFun(datosPersonalesObject, state.erroresDatosPersonales)
            state.erroresDatosPersonales = errdatosPersonalesObject.err;
            state.validDatosPersonales = errdatosPersonalesObject.valid;
            
            /**
             * Rellena el  objeto de datos personales con lo que nos hemos encontrado en local Storage
             */
            if (datosPersonalesObject != initialState.datosPersonales) {
                for (const key in datosPersonalesObject) {
                    if (state.datosPersonales.hasOwnProperty(key)) 
                        if (datosPersonalesObject.hasOwnProperty(key))
                            state.datosPersonales[key] = datosPersonalesObject[key];
                }
            }

            /**
             * Guarda en local los cambios realizados
             */
            localStorage.setItem('personalDataInfo', JSON.stringify(state));
            
            console.log("REDUCER INITIALIZE_DATOS_PERSONALES", action.data);
            return {
                ...state,
            };





        default:
            return state;
    }
}

/**
 * 
 * @param {} object Trae consigo el objeto a valiar los values del formulario de un usuario.
 * @param {} objectErr Trae consigo el objeto de redux a rellenar 
 */
function validDatosPersonalesFun(object, objectErr) {
    console.log("validDatosPersonalesFun",object)
    let validador=true
    let resValidation;
    /**
     * Realiza un bucle para rellenar el objeto de errores y para verificar si el form esta lleno correctamente
     */
    for (const key in object) {
        if (objectErr.hasOwnProperty(key)){
            resValidation = validator(object[key], key)
            objectErr[key] = resValidation
            if (resValidation != null)
                validador = false
        }
    }
    /**
     * Retorna el objeto de errores a guardar en redux 
     * Devuelve el resultado de si el formulario ya esta relleno correctamente o no true/false
     */
    return {
        err: objectErr,
        valid: validador
    }
}


function mapingToRedux(object, objectErr) {
    
}