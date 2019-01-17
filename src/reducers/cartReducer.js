import {
    SET_ITEM,
    GET_ITEMS
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
            console.log("SET_ITEM")
            return {
                ...state,
                items : state.items,
                loading: true,
                error: null
            };
        case GET_ITEMS:
            console.log("GET_ITEMS")
            return state;
        default:
            return state;
    }
}
