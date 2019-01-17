import {
    ADD_STEPS,
    UPDATE_STEP
} from '../actions/checkoutActions';

const initialState = {
    currentStep: 0,
    steps: [],
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

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}