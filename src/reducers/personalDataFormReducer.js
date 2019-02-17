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
        telefono: ""
    },
    erroresDatosPersonales: {
        apellido: "",
        birthday_omv: "",
        cifnif: "",
        codcliente: "",
        email: "",
        nombre: "",
        telefono: ""
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
            
            state["datosPersonales"][action.field] = action.data;
            state["erroresDatosPersonales"][action.field] = action.error;
            

            localStorage.setItem('personalDataInfo', JSON.stringify(state));
            return {
                ...state,
            };



        case INITIALIZE_DATOS_PERSONALES:

            const info = JSON.parse(localStorage.getItem('personalDataInfo'));
            let datosPersonalesObject, errdatosPersonalesObject;
            console.log("REDUCER INITIALIZE_DATOS_PERSONALES", info, typeof(info));

            if (info && typeof (info) === "object" && info != null && Object.keys(info.datosPersonales).length > 0){
                datosPersonalesObject = info.datosPersonales ? info.datosPersonales : initialState.datosPersonales;
            }
            else{
                datosPersonalesObject = action.data;
            }

            errdatosPersonalesObject = validDatosPersonalesFun(datosPersonalesObject, state.erroresDatosPersonales)
            state.erroresDatosPersonales = errdatosPersonalesObject.err;
            state.validDatosPersonales = errdatosPersonalesObject.valid;
            

            if (datosPersonalesObject != initialState.datosPersonales) {
                for (const key in datosPersonalesObject) {
                    if (state.datosPersonales.hasOwnProperty(key)) 
                        if (datosPersonalesObject[key])
                            state.datosPersonales[key] = datosPersonalesObject[key];
                }
            }

            localStorage.setItem('personalDataInfo', JSON.stringify(state));
            
            console.log("REDUCER INITIALIZE_DATOS_PERSONALES", action.data);
            return {
                ...state,
            };





        default:
            return state;
    }
}


function validDatosPersonalesFun(object, objectErr) {
    console.log("validDatosPersonalesFun",object)
    let validador=true
    let objectErrInterno = {}

    let resValidation;
    for (const key in object) {
        if (objectErr.hasOwnProperty(key)){
            resValidation = validator(object[key], key)
            objectErrInterno[key] = resValidation
            if (resValidation != null)
                validador = false
        }
    }

    return {
        err: objectErrInterno,
        valid: validador
    }
}