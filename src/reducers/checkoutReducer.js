import {

} from '../actions/checkoutActions';

const initialState = {
    paymentViewIsValid:false,
    paymentMethod:null, /**Iremos viendo qué hacemos con esto */
    existsService:false,
    checkoutProcessIsValid:false
};

export default function checkout(state = initialState, action) {

    switch (action.type) {

        default:
            return state;
    }
}