import {
  GET_RATES_BEGIN,
  GET_RATES_SUCCESS,
  GET_RATES_FAILURE,
} from '../actions/datosRatesActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function rates(state = initialState, action) {
  // console.log("REDUCEREMPRESA",action);
  switch (action.type) {
    case GET_RATES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      /* console.warn("GET_RATES_BEGIN") */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_RATES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      /* console.warn("GET_RATES_SUCCESSx", action.payload.rates) */
      return {
        ...state,
        loading: false,
        items: action.payload.rates[0].results,
        items2: action.payload.rates[1],
      };

    case GET_RATES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      /* console.warn("GET_RATES_FAIL5", typeof (action.payload.error), action.payload.error) */
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };

    default:
      // console.warn("GET_RATES_DEF")
      // ALWAYS have a default case in a reducer
      return state;
  }
}
