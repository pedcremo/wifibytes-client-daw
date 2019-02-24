import { 
    INITIALIZE_DATOS_PERSONALES,
    UPDATE_DATOS_PERSONALES,
    INIT_DATA_SERVICES,
    UPDATE_DATOS_SERVICES
} from '../actions/personalDataFormActions';
 import {validator}  from '../components/checkout/childComponents/personalData/validation';

const DATOS_PORTABILIDAD_MOVIL= {numTlf:'', sim:'', compania:'', tipo:'portabilidad'}
const DATOS_PORTABILIDAD_FIJO= {numTlf:'', compania:'', tipo:'portabilidad'}
const TIPOS_TARIFAS=[1,2];
const initialState = {
    datosPersonales: {
        apellido: '',
        birthday_omv: '',
        cifnif: '',
        codcliente: '',
        email: '',
        nombre: '',
        telefono: '',
        tipo_cliente:'',
        direccion:'',
        codpostal:'',
        ciudad:'',
        cuenta:'',
        provincia:'',
        dniFile:'',
    },
    erroresDatosPersonales: {
        apellido: '',
        birthday_omv: '',
        cifnif: '',
        codcliente: '',
        email: '',
        nombre: '',
        telefono: '',
        tipo_cliente:'',
        direccion:'',
        codpostal: '',
        ciudad:'',
        cuenta:'',
        provincia:'',
    },
    validDatosPersonales: false,

    datosProductos:[],
    validDatosProductos:false,
    
    validForms:false,
    loaded: false,
};

export default function personalDataFormReducer(state = initialState, action) {
    
    switch (action.type) {

        case UPDATE_DATOS_SERVICES:
            let newObject=state.datosProductos.map(item=>{
                if (item.key === action.itemKey) 
                    item[action.field] = action.data
                return item
            })  
            return {
                ...state,
                datosProductos : newObject,
                validDatosProductos : validDatosServicios(newObject),
                validForms: state.validDatosProductos && state.validDatosPersonales?true:false
                
            };
       

        case INIT_DATA_SERVICES:
            console.warn('REDUCER INIT_DATA_SERVICES', action.data);
            //const datos = JSON.parse(localStorage.getItem('personalDataInfo'));
            const datos = state.datosProductos;
            let newDatosProductos=[]
            let datosProductosAlmacenados = []
            /**
             * Este objeto filtra todos los productos que hay en el carrito y que necesiten un formulario.
             * Busca que el id de la subtarifa este contenido en el array TIPOS_TARIFAS. Esto nos da la ventaja de que en el futuro basta agregar un codigo nuevo en el array para que lo incluya.
             */
            let productosEnCarritoActual = action.data.length===0 ? [] : action.data.filter(item => {
                if (item.subtarifas) {
                    item.subtarifas = item.subtarifas.filter(el => {
                        if (TIPOS_TARIFAS.includes(el.id))
                            return el
                    })
                    return item
                }
            })
            /**
             * Comprueba si el local hay guardados datos de la ultima visita del usuario al formulario
             */
            if ((datos && typeof (datos) === 'object' && datos != null && datos.length > 0) || state.datosProductos.length>0)
                datosProductosAlmacenados = state.datosProductos.length > 0 ? state.datosProductos : datos.datosProductos
            
            
            

            for (let i = 0; i < productosEnCarritoActual.length; i++) {
                for (let k = 0; k < productosEnCarritoActual[i]['quantity']; k++) {
                    for (let j = 0; j < productosEnCarritoActual[i]['subtarifas'].length; j++) {
                        newDatosProductos.push({
                            key: `${i}_${k}_${j}`,
                            idTarifa: productosEnCarritoActual[i]['id'],
                            idSubtarifa: productosEnCarritoActual[i]['subtarifas'][j]['id'],
                            tipo: 'portabilidad',
                            tipoTlf: typeOfService(productosEnCarritoActual[i]['subtarifas'][j]['id']),
                            numTlf: '',
                            sim: '',
                            compania: '',
                            description:productosEnCarritoActual[i]['description']
                        })
                    }
                                            
                }
            }
            
            //Entara aqui cuando haya aumentado o disminuido una cantidad de una tarifa en el carrito y lo mezcla con los datos ya guardados en redux
            if (datosProductosAlmacenados.length != newDatosProductos.length) {
                for (let i = 0; i < newDatosProductos.length; i++) {
                    for (let j = 0; j < datosProductosAlmacenados.length; j++) {
                        if (newDatosProductos[i]['key'] === datosProductosAlmacenados[j]['key']) {
                            for (const key in newDatosProductos[i]) {
                                newDatosProductos[i][key] = datosProductosAlmacenados[j][key]
                            }
                            console.warn('newDatosProductos[i]',newDatosProductos[i])
                        }                        
                    }
                }
            }else{
                newDatosProductos = datosProductosAlmacenados
            }
            
            
            //console.warn('productosEnCarritoActual----', newDatosProductos)
            
        return {
            ...state,
            datosProductos: newDatosProductos
        };

        case UPDATE_DATOS_PERSONALES:
            //console.warn('UPDATE_DATOS_PERSONALES', action.field, action.data, action.error);
            /**
             * Actualiza los campos dentro del datosPersonales y erroresDatosPersonales en el storage de redux
             */
            let copiaDatosPersonales = state['datosPersonales']
            let copiaDatosPersonalesErr = state['erroresDatosPersonales']
            // state['datosPersonales'][action.field] = action.data;
            // state['erroresDatosPersonales'][action.field] = action.error;
            copiaDatosPersonales[action.field] = action.data;
            copiaDatosPersonalesErr[action.field] = action.error;
            /**
             * Verificamos si el formulario ya es valido y de ser asi le cambiamos a true validDatosPersonales
             */
            let errdatosPersonalesOb = validDatosPersonalesFun(copiaDatosPersonales, copiaDatosPersonalesErr)
            //state['validDatosPersonales'] = errdatosPersonalesOb.valid;
            /**
             * Guarda en local los cambios realizados
             */
            //localStorage.setItem('personalDataInfo', JSON.stringify(state));
            //state.validDatosProductos && state.validDatosPersonales ? (state.validForms = true) : ''
            return {
                ...state,
                validDatosPersonales: errdatosPersonalesOb.valid,
                datosPersonales: copiaDatosPersonales,
                erroresDatosPersonales: copiaDatosPersonalesErr,
                validForms: state.validDatosProductos && state.validDatosPersonales ? true : false
            };



        case INITIALIZE_DATOS_PERSONALES:

            //const info = JSON.parse(localStorage.getItem('personalDataInfo'));
            const info = action.data
            const infoInitial = initialState.datosPersonales
            console.warn('REDUCER INITIALIZE_DATOS_PERSONALES', info, action.data);
            let datosPersonalesObject, errdatosPersonalesObject, erroresDatosPersonales, validDatosPersonales;
            let newObjDatosPersonales = initialState.datosPersonales;
            /**
             * Comprueba si el local hay guardados datos de la ultima visita del usuario al formulario
             */
            datosPersonalesObject = (typeof(info)==='object'&&Object.keys(info).length>1) ? info : initialState.datosPersonales;
            
            /**
             * Valida si el form esta completo correctamente y cambia el objeto de errores de datos personales del state REDUX
             */
            errdatosPersonalesObject = validDatosPersonalesFun(datosPersonalesObject, state.erroresDatosPersonales)
            erroresDatosPersonales = errdatosPersonalesObject.err;
            validDatosPersonales = errdatosPersonalesObject.valid;
            
            console.error('REDUCER INITIALIZE_DATOS_PERSONALES', datosPersonalesObject);
            /**
             * Rellena el  objeto de datos personales con lo que nos hemos encontrado en local Storage
             */
            if (datosPersonalesObject != initialState.datosPersonales) {
                for (const key in datosPersonalesObject) {
                    if (state.datosPersonales.hasOwnProperty(key)) 
                        if (datosPersonalesObject.hasOwnProperty(key))
                            newObjDatosPersonales[key] = datosPersonalesObject[key];
                }
            }
            /**
             * Guarda en local los cambios realizados
             */
            //localStorage.setItem('personalDataInfo', JSON.stringify(state));
            
            //console.log('REDUCER INITIALIZE_DATOS_PERSONALES', action.data);
            return {
                ...state,
                datosPersonales: newObjDatosPersonales
            };

        default:
            //console.log(state);
            return state;
    }
}

/**
 * 
 * @param {} object Trae consigo el objeto a valiar los values del formulario de un usuario.
 * @param {} objectErr Trae consigo el objeto de redux a rellenar 
 */
function validDatosPersonalesFun(object, objectErr) {
    //console.log('validDatosPersonalesFun',object)
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




function typeOfService(idService) {
    switch (idService) {
        
        case 1:
            return 'movil'
            break;
        
        case 2:
            return 'fijo'
            break;
    
        default:
            break;
    }
}

function validDatosServicios(currentState) {
    //console.log('validDatosPersonalesFun',object)
    let resValidation;
    /**
     * Realiza un bucle para buscar errores en el form 
     */
    let p = currentState.map(object => {
        for (const key in object) {
            if (object.tipo!='alta') {
                resValidation = validator(object[key], key)
                if (resValidation != null){
                    return false
                }
            }
        }
    });
    
    return p.includes(false)?false:true
}