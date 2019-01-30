export const SET_LOCALSTORAGE = "SET_LOCALSTORAGE"
export const SET_ITEM = 'SET_ITEM';
export const GET_ITEMS = 'GET_ITEMS'
// export const QUANTITY_ITEM = 'QUANTITY_ITEM';
export const DEL_ITEM = 'DEL_ITEM';
export const SET_QUANTITY = 'SET_QUANTITY'

export const setItem = (item) => ({
    type: SET_ITEM,
    item,
    localStorageSave: true,
    reducer : "cartReducer",
});

export const getItems = () => ({
    type: GET_ITEMS,
    reducer : "cartReducer",
    localStorageGet: true,
    action : SET_LOCALSTORAGE
});

export const quantityItem = (item,quantity) => ({
    type: SET_QUANTITY,
    item,
    quantity,
    reducer : "cartReducer",
    localStorageSave: true
});
  

// export const increment_item = (item) => ({
//   type: QUANTITY_ITEM,
//   item
// });

export const delete_item = (item) => ({
  type: DEL_ITEM,
  item,
  localStorageUpdate : true,
  reducer : "cartReducer",
});
