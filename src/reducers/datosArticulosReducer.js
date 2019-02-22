import {
  GET_DATOS_ARTICULOS_BEGIN,
  GET_DATOS_ARTICULOS_SUCCESS,
  GET_DATOS_ARTICULOS_FAILURE,
  FILTER_FAMILY,
} from '../actions/datosArticulosActions';

const initialState = {
  items: [],
  filter: [],
  loading: false,
  error: null,
};

export default function datosArticulosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATOS_ARTICULOS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_DATOS_ARTICULOS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.datosArticulos,
      };

    case GET_DATOS_ARTICULOS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };
      case FILTER_FAMILY:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: false,
        filter:action.payload.filter,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
