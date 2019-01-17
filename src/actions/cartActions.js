export const SET_ITEM = 'SET_ITEM';
export const GET_ITEMS = 'GET_ITEMS'

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