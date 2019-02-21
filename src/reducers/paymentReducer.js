import {
  GET_PAYMENTS_BEGIN,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  PAYMENT_METHOD_UPDATE,
  UPDATE_FIELD,
} from '../actions/paymentActions';

const thisDate = new Date();

const initialState = {
  paymentMethod: 1, /** codpago de backend, visa/mastercard/american express por defecto */
  paymentMethods: [],
  /** Get the month we are, thisDate.getMonth() is an array so january is month 0, we have to add 1 */
  expirationMonth: thisDate.getMonth() + 1,
  /** Get the year we are */
  expirationYear: thisDate.getFullYear(),
  cardOwner: '',
  cardNumber: '',
  cvv: '',
};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        paymentMethod: action.value,
      };
    case GET_PAYMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentMethods: action.payload.formasdepago.results,
      };
    case GET_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {...state};
  }
}
