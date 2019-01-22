import {
    SET_ITEM,
    QUANTITY_ITEM,
    GET_ITEMS
} from '../actions/cartActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case SET_ITEM:
            let exist = state.items.filter((item)=>{return item.id == action.item.id})
            if(exist.length == 0){
                state.items.push(action.item)
            }else{
                state.items.filter((item)=>{
                    if(item.id == action.item.id){
                        item.quantity += 1;
                    }
                })
            }
            return {
                ...state,
                items : state.items,
                loading: true,
                error: null
            };
        case QUANTITY_ITEM:
        console.log(action.item.quantity)
            state.items.filter((item)=>{
                if(item.id == action.item.id){
                    item.quantity = item.quantity + item.quantity_item;
                }
            })
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
