export const Agent = {

  /**
  * An array of objects is iterated over another array of object that contains
  * rules to achieve
  * It returns an array of the validated rules
  * @param {Array} array Contains an array of all the available components
  * @param {Object} library Contains a library with the rules for each steps
  * to be displayed
  * @return {Array} A simple array that contains needed steps
  */
  objectsToArray: function(array, library) {
    if (Array.isArray(array) && typeof library == 'object') {
      const filtered = [];
      array.forEach((element) => {
        library.fieldsToValidate.forEach( (item)=>{
          const regexp = new RegExp(item.regexp);
          if (regexp.test(element.id) && !filtered.includes(item.field)) {
            filtered.push(item.field);
          }
        });
      });
      return filtered.concat(library.requiredFields);
    } else {
      throw new Error(`Error in objectsToArray method.
      Parameters must be objects`);
    }
  },

  /**
  * It filters an array of object and returns only the objects
  * that are included in the requested simple array
  * @param {Array} array Contains an array of all the available components
  * @param {Array} requested Contains a simple array with the needed steps
  * @return {Object} array of objects - An array that contains the filtered
  * library steps.js
  */
  filterArray: function(array, requested) {
    return array.filter((el) => {
      return requested.includes(el.key);
    });
  },

  /**
  * Iterates an array that will filter a field that comes from the library,
  * where it first validates according to the rules of the library
  * and will return the quantities of each specified field
  * @param {Array} array Contains an array of all the cart products
  * @param {Object} library Contains a library with the rules for the method
  * to quantify any param
  * @return {Object} object - An object with the quantities by item
  */
  arrayToQuantityObject: function(array, library) {
    if (typeof array == 'object' && typeof library == 'object') {
      const quantities = {};
      library.fieldsToValidate.forEach((element) => {
        quantities[element.field] = 0;
      });
      array.forEach((element) => {
        const ObjectExist = element.hasOwnProperty(library.requiredFields);
        if (ObjectExist) {
          const fieldRequire = library.requiredFields;
          element[fieldRequire].forEach((item) => {
            library.fieldsToValidate.filter((el) => {
              const regexp = new RegExp(el.regexp);
              regexp.test(item.id) ? quantities[el.field]++ : false;
            });
          });
        }
      });
      return quantities;
    } else {
      throw new Error(`Error in objectsToArray method. 
      Parameters must be objects`);
    }
  },

  /**
    * Iterates items and checks if the key exists in the objects and if
    * they are full. Then if it is correct, it counts if it is equal
    * to the same number of items to send it to the server
    * @param {Object} data Object of objects, where in each one of them contains
    * the data to send
    * @param {Array} items Array cotaining steps to follow
    */
  objectSendToOrder: function(data, items) {
    let cont = 0;
    if (typeof data == 'object' && typeof Array.isArray(items)) {
      items.filter((element) => {
        data.hasOwnProperty(element.key) &&
        Object.keys(data[element.key]).length > 0 ? cont++ : false;
      });
      if (cont == items.length) {
        console.log('LLEST', data);
        /* Utils.post("/pedidos",data).then(response =>{
                        response = JSON.parse(response);
                        console.log("PEDIDOS",response);
                        //resolve(res);
                }).catch((err)=>{
                        reject(err);
                });*/
      }
    } else {
      throw new Error(`Error in ObjectSendToOrder method.
      Data must be am object and items must contain an array`);
    }
  },
};
