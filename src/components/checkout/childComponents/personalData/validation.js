/**
 * Regex is a library of a regular expressions to the APP
 */
import { Regex } from '../../../../regex'



/**
 * Function to validate Personal data form
 * @value {string} its the value of a field.
 * @type {string} its the type of a field by default will be type text.
 * @name {string} it will be used to check what kind of param it is.
 */
export function validator(value, name) {
    /**
     * If a field does not have value go this first conditional
     */
    console.log(value, name)
    if (value != null) {

        if (value.length<1)
            return "Este campo es requerido"

        if (value.length < 3 && (name === "nombre" || name === "apellido" || name === "ciudad"))
            return "Este campo necessita minimo 3 caracteres"
        
        if (name === "dni" && !Regex.regexDni.test(value))
            return "Este no es un dni valido"
        
        //if (fn_ValidateIBAN(IBAN) && name === "cuenta")
        if (value.length < 7 && name === "cuenta")
                return "Esta cuenta no es valida"

        if (name === "email" && !Regex.regexEmail.test(value))
            return "Este no es un email valido"

        
        if (name === "phone" && !Regex.regexPhone.test(value))
            return "This is not a valid phone"

        if (name === "zip" && !Regex.regexZip.test(value))
            return "This is not a valid zip"

        if (name === "sim" && !Regex.regexSIM.test(value))
            return "This is not a valid sim"

        if (name === "fecha" && !value.match(Regex.regexFNAC))
            return "Esta fecha no es valida"

    }
    return null
}

function fn_ValidateIBAN(IBAN) {
    //Se pasa a Mayusculas
    IBAN = IBAN.toUpperCase();
    //Se quita los blancos de principio y final.
    IBAN = IBAN.trim();
    IBAN = IBAN.replace(/\s/g, ""); //Y se quita los espacios en blanco dentro de la cadena

    var letra1, letra2, num1, num2;
    var isbanaux;
    var numeroSustitucion;
    //La longitud debe ser siempre de 24 caracteres
    if (IBAN.length != 24) 
        return false;
    
    // Se coge las primeras dos letras y se pasan a números
    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letra1);
    num2 = getnumIBAN(letra2);
    //Se sustituye las letras por números.
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);
    //Se calcula el resto, llamando a la función modulo97, definida más abajo
    resto = modulo97(isbanaux);
    if (resto == 1) 
        return true;
    else 
        return false;
    
}

function modulo97(iban) {
    var parts = Math.ceil(iban.length / 7);
    var remainer = "";
    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer + iban.substr((i - 1) * 7, 7)) % 97);
    }
    return remainer;
}

function getnumIBAN(letra) {
    ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}