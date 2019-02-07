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

    cvv: /^[0-9]{3,4}$/,
    cardOwner: /[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,} [a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,}/g,
    iban: /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d)\s*\t*(\d\d\d\d\d\d\d\d\d\d)/g
}; //END Regex object


export {
    Regex
};
