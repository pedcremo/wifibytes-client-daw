import {
    GET_CURRENT_RATE_BEGIN,
    GET_CURRENT_RATE_SUCCESS,
    GET_CURRENT_RATE_FAILURE
} from '../actions/currentRateDetailsActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function currentRateDetails(state = initialState, action) {
    //console.log("REDUCEREMPRESA",action);
    switch (action.type) {
        case GET_CURRENT_RATE_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            //console.warn("GET_CURRENT_RATE_BEGIN")
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_CURRENT_RATE_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            //console.warn("GET_CURRENT_RATE_SUCCESSx")
            return {
                ...state,
                loading: false,
                items: action.payload.currentRateDetails
            };

        case GET_CURRENT_RATE_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            //console.warn("GET_CURRENT_RATE_FAIL5", typeof (action.payload.error), action.payload.error)
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: []
            };

        default:
            //console.warn("GET_CURRENT_RATE_DEF")
            // ALWAYS have a default case in a reducer
            return state;
    }
}