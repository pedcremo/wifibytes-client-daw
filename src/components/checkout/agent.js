import Utils from "../../utils";
export const Agent = {

    /**
     * An array of objects is iterated over another array of object that contains rules to achieve
     * It returns an array of the validated rules
     */
    objectsToArray: function (array, library) {
        if (Array.isArray(array) && typeof library == "object") {
            let filtered = [];
            array.forEach(function (element) {
                library.fieldsToValidate.forEach(function (item) {
                    let regexp = new RegExp(item.regexp);
                    if (regexp.test(element.id) && !filtered.includes(item.field)) filtered.push(item.field);
                });
            });
            return filtered.concat(library.requiredFields);
        } else
            throw ("Error in objectsToArray method. Parameters must be objects");

    },

    /**
     * It filters an array of object and returns only the objects that are included in the requested simple array
     */
    filterArray: function (array, requested) {
        return array.filter(function (el) {
            return requested.includes(el.key)
        });
    },

    /**
     * Iterates an array that will filter a field that comes from the library, 
     * where it first validates according to the rules of the library and will return 
     * the quantities of each specified field
     */
    arrayToQuantityObject: function (array, library) {
        if (typeof array == "object" && typeof library == "object") {
            let quantities = {};
            library.fieldsToValidate.forEach(element => { quantities[element.field] = 0; });
            array.forEach(element => {
                let ObjectExist = element.hasOwnProperty(library.requiredFields);
                if (ObjectExist) {
                    let fieldRequire = library.requiredFields;
                    element[fieldRequire].forEach(item => {
                        library.fieldsToValidate.filter(el => {
                            let regexp = new RegExp(el.regexp);
                            regexp.test(item.id) ? quantities[el.field] = quantities[el.field] + 1 * element.quantity : false;
                        });
                    });
                }
            });
            return quantities;
        } else
            throw ("Error in objectsToArray method. Parameters must be objects");

    },

    ObjectSendToOrder: function (data, items) {
        let cont = 0;
        items.filter(element => {
            data.hasOwnProperty(element.key) && Object.keys(data[element.key]).length > 0 ? cont++ : false;
        });
        if (cont == items.length) {
            console.log("LLEST",data);
            /*Utils.post("/pedidos",data).then(response =>{
                    response = JSON.parse(response);
                    console.log("PEDIDOS",response);
                    //resolve(res);
            }).catch((err)=>{
                    reject(err);
            });*/
        }

    }
};