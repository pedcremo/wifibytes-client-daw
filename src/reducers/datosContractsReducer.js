import {
    GET_CONTRACT_BEGIN,
    GET_CONTRACT_SUCCESS,
    GET_CONTRACT_FAILURE,
    SEND_CONTRACT
  } from '../actions/datosContractsAction';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function datosContractsReducer(state = initialState, action) {
    //console.log("REDUCEREMPRESA",action);
    switch(action.type) {
      case GET_CONTRACT_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        //console.warn("GET_DATOS_EMPRESA_BEGIN")
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_CONTRACT_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        //console.warn("GET_DATOS_EMPRESA_SUCCESSx")
        console.warn(action.payload.status);   
        return {
          ...state,
          loading: false,
          items: action.payload.status
        };
  
      case GET_CONTRACT_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        //console.warn("1GET_DATOS_EMPRESA_FAIL5", typeof (action.payload.error), action.payload.error)
        return {
          ...state,
          loading: false,
          error: action.payload,
          items: []
        };

      case SEND_CONTRACT:
        console.log(action.payload.contract);
        return {
          ...state,
          contractSigned: action.payload.html
        }

      default:
      //console.warn("1GET_DATOS_EMPRESA_DEF")
        // ALWAYS have a default case in a reducer
        return state;
    }
  }