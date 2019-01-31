import {
    SET_ITEM,
    GET_ITEMS,
    DEL_ITEM,
    SET_QUANTITY,
    SET_LOCALSTORAGE
} from './cartActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case SET_ITEM:
            console.log(action.item)
            let exist = state.items.filter((item)=>{return item.id == action.item.id})
            if(exist.length == 0){
                action.item.quantity = 1;
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
        case DEL_ITEM:
            const items = state.items.filter((item)=>{return item.id !== action.item.id})
            return{
              ...state,
              items : items,
              loading: true,
              error: null
            };
        case SET_QUANTITY:
            state.items.filter((item)=>{
                if(item.id == action.item.id && action.quantity > 0 || item.id == action.item.id && action.quantity === ''){
                    if(item.id == action.item.id && action.quantity === ''){
                        item.quantity = action.quantity
                    }else
                        item.quantity = parseInt(action.quantity)
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
        case SET_LOCALSTORAGE:
            return {
                ...state,
                items : action.currentStore.items,
                loading: action.currentStore.loading,
                error: action.currentStore.error
            }
        default:
            return state;
    }
}
