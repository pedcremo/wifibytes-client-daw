/**
 * This is a library of regular expressions
 * We will use this regex to match for exemple input's values an validate them. 
 */
let Regex = {

    /**  
     * regexEmail check if a email is compose of ".", "@"
     */
    regexEmail: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
    
    /**  
     * regexZip check if a zip has 5 digits
     */
    regexZip: /^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/,

    /**  
     * regexPhone check if a phone has 9 digits and has started by 9 or 6 
     */
    regexPhone: /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/,
    /**
     * regexDni check if dni is valid
     */
    regexDni: /^[0-9]{8,8}[A-Za-z]$/g,
    /**
     * regexFechNac check if fecha nacimiento is valid
     */
    regexFNAC: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g,

    regexSIM: /[0-9]{20}/
}; //END Regex object


export {
    Regex
};
