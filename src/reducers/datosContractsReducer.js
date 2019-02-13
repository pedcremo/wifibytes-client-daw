import {
  GET_CONTRACTS
} from '../constants/actionTypes';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function datosContractsReducer(state = initialState, action) {
    //console.log("REDUCEREMPRESA",action);
    switch(action.type) {
  
      case GET_CONTRACTS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        //console.warn("GET_DATOS_EMPRESA_SUCCESSx")
        console.warn(action.response);   
        return {
          ...state,
          loading: false,
          items: action.response.contracts ? action.response.contracts : [],
          error: action.response.error ? action.response.error : false
        };

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }