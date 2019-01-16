export const SET_ITEM = 'SET_ITEM';

export const setItem = item => (dispatch) => {
    dispatch(setItemBegin(item))
}

export const setItemBegin = (item) => ({
    type: SET_ITEM,
    item
});