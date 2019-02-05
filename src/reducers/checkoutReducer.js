import {
    ADD_STEPS,
    NEXT_STEP,
    PREVIOUS_STEP,
    UPDATE_STEP,
    SET_COMPLETED,
    SET_UNCOMPLETED,
    SET_CONTRACTS,
    UPDATE_DATA
} from '../constants/actionTypes';

const initialState = {
    currentStep: 0,
    steps: [],
    data: {},
    loading: false,
};

export default function currentCheckout(state = initialState, action) {
    switch (action.type) {
        case ADD_STEPS:
            return {
                ...state,
                loading: false,
                currentStep: action.payload.step,
                steps: action.payload.steps
            };

        case NEXT_STEP:
            if (state.currentStep < state.steps.length + 1){
                state.steps[state.currentStep-1].active=false;
                state.steps[state.currentStep].active=true;
            }
            return {
                ...state,
                loading: false,
                currentStep: state.currentStep+1
            };

        case PREVIOUS_STEP:
            if (state.currentStep < state.steps.length + 1){
                state.steps[state.currentStep-1].active=false;
                state.steps[state.currentStep].active=true;
            }
            return {
                ...state,
                loading: false,
                currentStep: state.currentStep-1
            };

        case UPDATE_STEP:
            if (state.currentStep < state.steps.length + 1){
                state.steps[state.currentStep-1].active=false;
                state.steps[action.payload.step-1].active=true;
            }
            return {
                ...state,
                loading: false,
                currentStep: action.payload.step
            };
        
        case SET_COMPLETED:
            state.steps[state.currentStep-1].completed=true;
            return {
                ...state,
            };

        case SET_UNCOMPLETED:
            state.steps[state.currentStep-1].completed=false;
            return {
                ...state,
            };

        case UPDATE_DATA:
            return {
                ...state,
                // data[action.payload]: action.payload.data
                data
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}