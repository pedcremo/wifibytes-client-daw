export const SET_ITEM = 'SET_ITEM';
export const GET_ITEMS = 'GET_ITEMS'
// export const QUANTITY_ITEM = 'QUANTITY_ITEM';
export const DEL_ITEM = 'DEL_ITEM';
export const SET_QUANTITY = 'SET_QUANTITY'

export const setItem = (item) => ({
    type: SET_ITEM,
    item
});

export const getItems = () => ({
    type: GET_ITEMS,
});

export const quantityItem = (item,quantity) => ({
    type: SET_QUANTITY,
    item,
    quantity
});
  

// export const increment_item = (item) => ({
//   type: QUANTITY_ITEM,
//   item
// });

export const delete_item = (item) => ({
  type: DEL_ITEM,
  item
});
