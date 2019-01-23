export const Agent = {

    /**
     * return the steps to follow depending on the type of item
     */
    objectsToArray: function (array, library){
        if( typeof array == "object" && typeof library == "object"){
            let filtered = [];
            array.forEach(function(element) {
                library.fieldsToValidate.forEach(function(item) {
                    if(item.regexp.test(element.id) && !filtered.includes(item.field)) filtered.push(item.field);
                });
            });
            return filtered.concat(library.requiredFields);
        }else
            throw("Error in the objectsToArray method of the agent. Parameters have to be objects");
                 
    },

    /**
     * it checks if it exists in the predefined steps in the component and 
     * returns an object that needs Step.Group to put it in active
     */
    filterArray: function (array, requested) {
        return array.filter(function (el) {
            return requested.includes(el.key)
        });
    }
};