export const SET_ITEM = 'SET_ITEM';
export const GET_ITEMS = 'GET_ITEMS'
export const QUANTITY_ITEM = 'QUANTITY_ITEM';
export const DEL_ITEM = 'DEL_ITEM';

export const setItem = item => {
    return (dispatch) => {
        dispatch(setItemBegin(item))
    }
}
export const getItems = () => {
    return (dispatch) => {
        dispatch(getItemsBegin())
    }
}

export const setItemBegin = (item) => ({
    type: SET_ITEM,
    item
});

export const getItemsBegin = () => ({
    type: GET_ITEMS,
});

export const increment_item = (item) => ({
  type: QUANTITY_ITEM,
  item
});

export const delete_item = (item) => ({
  type: DEL_ITEM,
  item
});
