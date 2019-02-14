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
export function validator(value, name, type="text") {
    /**
    * If a field does not have value go this first conditional
    */
   console.log("validator-------------", value, name, type)
    if (type=="text" && value.length == 0) 
        return "This field is required"

    /**
     * If a field has value got inside here and check using type and value 
     * Return a error or nothing if the value is correct .
     */
    switch (type) {
        
        case "text":
            if (value.length < 3 && (name === "name" || name === "surname" || name === "city"))
                return "This field has minus of 3 values"
            if (value.length < 7 && name === "address")
                return "This field has minus of 7 values"
            if (name === "dni" && !Regex.regexDni.test(value))
                return "Este no es un dni valido"
            /* if (name === "cuenta" && !fn_ValidateIBAN(value))  */
            if (value.length < 7 && name === "cuenta")
                return "Esta cuenta no es valida"
            break;

        case "email":
            if (!Regex.regexEmail.test(value))
            return "This is not a valid email"
        break;
        
        case "number":
            if (name === "phone" && !Regex.regexPhone.test(value))
                return "This is not a valid phone"
            if (name === "zip" && !Regex.regexZip.test(value))
                return "This is not a valid zip"
            if (name === "sim" && !Regex.regexSIM.test(value))
                return "This is not a valid sim"
            break;
        case "date":
            if (!value.match(Regex.regexFNAC))
                return "Esta fecha no es valida"
            
            break;
        case "select-one":
            if (value=="")
                return "Este campo es requerido"
            break;
    
        default:
            return ""
            break;
    }
    
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