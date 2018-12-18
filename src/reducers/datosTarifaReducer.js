import {
    GET_DATOS_TARIFA_BEGIN,
    GET_DATOS_TARIFA_SUCCESS,
    GET_DATOS_TARIFA_FAILURE
  } from '../actions/datosTarifasActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function datosTarifaReducer(state = initialState, action) {
    switch(action.type) {
      case GET_DATOS_TARIFA_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        //console.warn("GET_DATOS_TARIFA_BEGIN")
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_DATOS_TARIFA_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        //console.warn("GET_DATOS_TARIFA_SUCCESS")        
        return {
          ...state,
          loading: false,
          items: action.payload.datosTarifa
        };
  
      case GET_DATOS_TARIFA_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        //console.warn("GET_DATOS_TARIFA_FAILURE", typeof (action.payload.error), action.payload.error)
        return {
          ...state,
          loading: false,
          error: action.payload,
          items: []
        };
  
      default:
      //console.warn("GET_DATOS_TARIFA_DEFAULT")
        // ALWAYS have a default case in a reducer
        return state;
    }
  }