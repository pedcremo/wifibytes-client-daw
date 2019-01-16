import {
    SET_ITEM,
} from '../actions/cartActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function cart(state = initialState, action) {
    //console.log("REDUCEREMPRESA",action);
    switch (action.type) {
        case SET_ITEM:
            state.items.push(action.item)
            return {
                ...state,
                items : state.items,
                loading: true,
                error: null
            };
        case GET_ITEMS:
            return state;
        default:
            return state;
    }
}
