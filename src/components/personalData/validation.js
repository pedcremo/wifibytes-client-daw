/**
 * Regex is a library of a regular expressions to the APP
 */
import { Regex } from '../../regex'



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
    if (value.length==0) 
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
            break;

    
        default:
            return ""
            break;
    }
    
}

