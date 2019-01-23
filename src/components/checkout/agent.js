export const Agent = {

    objectsToArray: function (array, library){
        let filtered = [];
        array.forEach(function(element) {
            library.fieldsToValidate.forEach(function(item) {
                if(item.regexp.test(element.id) && !filtered.includes(item.field)) filtered.push(item.field);
            });
        });
        return filtered.concat(library.requiredFields);         
    },

    filterArray: function (array, requested) {
        return array.filter(function (el) {
            return requested.includes(el.key)
        });
    }
};