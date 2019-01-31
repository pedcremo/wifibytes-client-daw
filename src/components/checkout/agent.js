export const Agent = {

    /**
     * An array of objects is iterated over another array of object that contains rules to achieve
     * It returns an array of the validated rules
     */
    objectsToArray: function (array, library){
        if( typeof array == "object" && typeof library == "object" ){
            let filtered = [];
            array.forEach(function(element) {
                library.fieldsToValidate.forEach(function(item) {
                    let regexp = new RegExp(item.regexp);
                    if(regexp.test(element.id) && !filtered.includes(item.field)) filtered.push(item.field);
                });
            });
            return filtered.concat(library.requiredFields);
        } else
            throw( "Error in objectsToArray method. Parameters must be objects" );
                 
    },

    /**
     * It filters an array of object and returns only the objects that are included in the requested simple array
     */
    filterArray: function (array, requested) {
        return array.filter(function (el) {
            return requested.includes(el.key)
        });
    },

    arrayToQuantityObject: function (array, library){
        if( typeof array == "object" && typeof library == "object" ){
            let quantities = {};
            library.forEach(function(element) {
               quantities[element.field] = 0;
            });
            array.forEach(function(element) {
                if (element.tarifa){
                    element.tarifa.forEach(function(item) {
                        library.filter(function (el) {
                            let regexp = new RegExp(el.regexp);
                            if (regexp.test(item.id))return quantities[el.field]++
                            return;
                        });
                    });
                }
            });
            return quantities;
        } else
            throw( "Error in objectsToArray method. Parameters must be objects" );
                 
    }
};