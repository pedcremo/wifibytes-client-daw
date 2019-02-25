import {
	INITIALIZE_DATOS_PERSONALES,
	UPDATE_DATOS_PERSONALES,
	INIT_DATA_SERVICES,
	UPDATE_DATOS_SERVICES
} from '../actions/personalDataFormActions';
import { validator } from '../components/checkout/childComponents/personalData/validation';

const DATOS_PORTABILIDAD_MOVIL = {
	numTlf: '',
	sim: '',
	compania: '',
	tipo: 'portabilidad'
};
const DATOS_PORTABILIDAD_FIJO = {
	numTlf: '',
	compania: '',
	tipo: 'portabilidad'
};
const TIPOS_TARIFAS = [ 1, 2 ];
const initialState = {
	datosPersonales: {
		apellido: '',
		//birthday_omv: '',
		cifnif: '',
		//codcliente: '',
		email: '',
		nombre: '',
		//telefono: '',
		tipo_cliente: '',
		direccion: '',
		codpostal: '',
		ciudad: '',
		cuenta: '',
		provincia: ''
		//dniFile: '',
	},
	erroresDatosPersonales: {
		apellido: '',
		//birthday_omv: '',
		cifnif: '',
		//codcliente: '',
		email: '',
		nombre: '',
		//telefono: '',
		tipo_cliente: '',
		direccion: '',
		codpostal: '',
		ciudad: '',
		cuenta: '',
		provincia: ''
		/* dniFile:"", */
	},
	validDatosPersonales: false,

	datosProductos: [],
	validDatosProductos: false,

	validForms: false,
	loaded: false
};

export default function personalDataFormReducer(state = initialState, action) {
    switch (action.type) {

        case UPDATE_DATOS_SERVICES:
            /**
             * Entra los datos del input que va a cambiar a travez del action.
             * Hacemos una copia del state datosProductos para poder trabajar con el y seguir teniendo el state inmutable.
             */
			let newObject = state.datosProductos.map((item) => {
				if (item.key === action.itemKey) item[action.field] = action.data;
				return item;
			});
			/**
             * Validamos el objeto datosProductos del state y comprobamos si el state DatosPersonales tambien esta validado
             */
            let newvalidDatosProductos = validDatosServicios(newObject);
            let formsValidados = (newvalidDatosProductos && state.validDatosPersonales) ? true : false;
            
            return {
                ...state,
                datosProductos: newObject,
                validDatosProductos: newvalidDatosProductos,
                validForms: formsValidados
            };


			return {
				...state,
				datosProductos: newObject,
				validDatosProductos: newvalidDatosProductos,
				validForms: formsValidados
			};

        case INIT_DATA_SERVICES:
            //console.warn('REDUCER INIT_DATA_SERVICES', action.data);
            const datos = state.datosProductos;
            let newDatosProductos = [];
            let datosProductosAlmacenados = [];
            /**
             * Este objeto filtra todos los productos que hay en el carrito y que necesiten un formulario.
             * Busca que el id de la subtarifa este contenido en el array TIPOS_TARIFAS. Esto nos da la ventaja de que en el futuro basta agregar un codigo nuevo en el array para que lo incluya en el filtrado.
             */
			const productosEnCarritoActual =
				action.data.length === 0
					? []
					: action.data.filter((item) => {
							if (item.subtarifas) {
								item.subtarifas = item.subtarifas.filter((el) => {
									if (TIPOS_TARIFAS.includes(el.id)) {
										return el;
									}
								});
								return item;
							}
						});
			/**
             * Comprueba si redux tiene datos guardados de los formularios
             */
			if (
				(datos && typeof datos === 'object' && datos != null && datos.length > 0) ||
				state.datosProductos.length > 0
			) {
				datosProductosAlmacenados =
					state.datosProductos.length > 0 ? state.datosProductos : datos.datosProductos;
			}

            /**
             * Creamos on array de objectos a partir del carrito actual, para luego poder saber si hay mas o menos productos que en el estado actual.
             */
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
							description: productosEnCarritoActual[i]['description']
						});
					}
				}
			}

			/**
             * Compara el objeto de servicios guardado en redux y el que viene del carrito, si hubiese diferencia, se crea un array nuevo y lo igualamos al estado de redux
             */
            if (datosProductosAlmacenados.length != newDatosProductos.length) {
                for (let i = 0; i < newDatosProductos.length; i++) {
                    for (let j = 0; j < datosProductosAlmacenados.length; j++) {
                        if (newDatosProductos[i]['key'] === datosProductosAlmacenados[j]['key']) {
                            for (const key in newDatosProductos[i]) {
                                newDatosProductos[i][key] = datosProductosAlmacenados[j][key];
                            }
                            //console.warn('newDatosProductos[i]', newDatosProductos[i]);
                        }
                    }
                }
            } else {
                newDatosProductos = datosProductosAlmacenados;
            }
            /**
             * Comprobamos el estado de  DatosProductos ya que si no tiene nada su validacion debe estar como correcta
             * */
            if (newDatosProductos.length == 0) {
                let formsValidadosC = (true && state.validDatosPersonales) ? true : false;
                return {
                    ...state,
                    validDatosProductos: true,
                    validForms: formsValidadosC,
                    datosProductos: newDatosProductos,
                };
            }else{
                let newvalidDatosProductos_ = validDatosServicios(newDatosProductos);
                let formsValidados_ = (newvalidDatosProductos_ && state.validDatosPersonales) ? true : false;
                return {
                    ...state,
                    validDatosProductos: newvalidDatosProductos_,
                    validForms: formsValidados_,
                    datosProductos: newDatosProductos,
                };
            }


        case UPDATE_DATOS_PERSONALES:
           // console.warn('UPDATE_DATOS_PERSONALES', action.field, action.data, action.error);
            /**
             * Actualiza los campos dentro del datosPersonales y erroresDatosPersonales en el storage de redux
             */
            const copiaDatosPersonales = state['datosPersonales'];
            const copiaDatosPersonalesErr = state['erroresDatosPersonales'];

			copiaDatosPersonales[action.field] = action.data;
			copiaDatosPersonalesErr[action.field] = action.error;
			/**
             * Verificamos si el formulario ya es valido y de ser asi le cambiaremos a true validDatosPersonales reux state
             */
            //console.log("UPDATE_DATOS_PERSONALES2", copiaDatosPersonales, validDatosPersonalesFun(copiaDatosPersonales, copiaDatosPersonalesErr))
            const errdatosPersonalesOb = validDatosPersonalesFun(copiaDatosPersonales, copiaDatosPersonalesErr);
            /**
             * Hacemos una comprobacion de los estados para saber si tenemos que cambiar el estado principal validForms.
             */
            let formsValidados2 = (state.validDatosProductos && errdatosPersonalesOb.valid) ? true : false;
            return {
                ...state,
                validDatosPersonales: errdatosPersonalesOb.valid,
                datosPersonales: copiaDatosPersonales,
                erroresDatosPersonales: copiaDatosPersonalesErr,
                validForms: formsValidados2
            };



        case INITIALIZE_DATOS_PERSONALES:

            const info = action.data;
            //console.warn('REDUCER INITIALIZE_DATOS_PERSONALES', info, action.data);
            const infoInitial = initialState.datosPersonales;
            let datosPersonalesObject;
            let errdatosPersonalesObject;
            let erroresDatosPersonales;
            let validDatosPersonales;
            let newObjDatosPersonales = initialState.datosPersonales;
            /**
             * Comprueba si hay info (datos del usuario provinientes del backend)
             */
            //datosPersonalesObject = (typeof(info)==='object'&&Object.keys(info).length>1) ? info : initialState.datosPersonales;
            //console.warn('datosPersonalesObject', state.datosPersonales);
            datosPersonalesObject = (initialState.datosPersonales == state.datosPersonales) ? info : state.datosPersonales;
            //console.warn('datosPersonalesObject', datosPersonalesObject);
            /**
             * Valida si el form esta completo correctamente y cambia el objeto de errores de datos personales del state REDUX
             */
			errdatosPersonalesObject = validDatosPersonalesFun(datosPersonalesObject, state.erroresDatosPersonales);
			erroresDatosPersonales = errdatosPersonalesObject.err;
			validDatosPersonales = errdatosPersonalesObject.valid;

			/**
             * Cambia el valora algunos parametros de datosPersonalesObject para luego igualarlo al estado principal
             */
            for (const key in state.datosPersonales) {
                if (Object.keys(state.datosPersonales[key]).length === 0) {
                    if (datosPersonalesObject[key]==undefined) {
                        newObjDatosPersonales[key] = "";
                    }else{
                        newObjDatosPersonales[key] = datosPersonalesObject[key];
                    }
                }else{
                    newObjDatosPersonales[key] = state.datosPersonales[key];
                }
            }
            //debugger
            //console.error('REDUCER INITIALIZE_DATOS_PERSONALES', newObjDatosPersonales, datosPersonalesObject);
            
            return {
                ...state,
                datosPersonales: newObjDatosPersonales,
            };

		default:
			// console.log('REDUCER default', action.data);
			return state;
	}
}

/**
 *
 * @param {} object Trae consigo el objeto a valiar los values del formulario de un usuario.
 * @param {} objectErr Trae consigo el objeto de redux a rellenar
 */
function validDatosPersonalesFun(object, objectErr) {
	// console.log("validDatosPersonalesFun",object)
	let validador = true;
	let resValidation;
	/**
     * Realiza un bucle para rellenar el objeto de errores y para verificar si el form esta lleno correctamente
     */
	for (const key in object) {
		if (objectErr.hasOwnProperty(key)) {
			resValidation = validator(object[key], key);
			objectErr[key] = resValidation;
			if (object[key] == null || resValidation != null) {
				validador = false;
			}
		}
	}
	/**
     * Retorna el objeto de errores a guardar en redux
     * Devuelve el resultado de si el formulario ya esta relleno correctamente o no true/false
     */
	return {
		err: objectErr,
		valid: validador
	};
}

function typeOfService(idService) {
	switch (idService) {
		case 1:
			return 'movil';
			break;

		case 2:
			return 'fijo';
			break;

		default:
			break;
	}
}

function validDatosServicios(currentState) {
	// console.log("validDatosPersonalesFun",object)
	let resValidation;
	/**
     * Realiza un bucle para buscar errores en el form
     */
    const datosValidados = currentState.map((object) => {
        for (const key in object) {
            if (object.tipo != 'alta') {
                if (object.tipoTlf=="fijo") 
                    delete object["sim"];
                
                resValidation = validator(object[key], key);
                //console.error("validator", object, object[key], key, resValidation)
                if (resValidation != null) {
                    return false;
                }
            }
        }
    });
    //console.error("p.includes(false) ? false : true", p, "---------",resValidation, "-----", p.includes(false) ? false : true)
    return datosValidados.includes(false) ? false : true;
}
