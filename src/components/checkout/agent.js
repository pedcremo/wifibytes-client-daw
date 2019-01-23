export const Agent = {

    /**
     * An array of objects is iterated over another array of object that contains rules to achieve
     * It returns an array of the validated rules
     */
    objectsToArray: function (array, library){
        let filtered = [];
        array.forEach(function(element) {
            library.fieldsToValidate.forEach(function(item) {
                if(item.regexp.test(element.id) && !filtered.includes(item.field)) filtered.push(item.field);
            });
        });
        return filtered.concat(library.requiredFields);
                 
    },

    /**
     * It filters an array of object and returns only the objects that are included in the requested simple array
     */
    filterArray: function (array, requested) {
        return array.filter(function (el) {
            return requested.includes(el.key)
        });
    }
};