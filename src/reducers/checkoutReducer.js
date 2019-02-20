import {
    ADD_STEPS,
    NEXT_STEP,
    PREVIOUS_STEP,
    UPDATE_STEP,
    SET_COMPLETED,
    SET_UNCOMPLETED,
    EMPTY_CHILD,
    UPDATE_DATA,
    DISABLE_BUTTON,
    ACTIVATE_BUTTON
} from '../constants/actionTypes';

const initialState = {
    currentStep: 0,
    steps: [],
    data: {},
    loading: false,
    disabled: true
};

let steps;

export default function currentCheckout(state = initialState, action) {
    switch (action.type) {
        case ADD_STEPS:

            if (state.currentStep === 0 || state.currentStep >= state.steps.length + 1 || state.steps.length != action.payload.steps.length) {
                action.payload.steps.map(function (step) {
                    return step.active = false;
                });
                action.payload.steps[0].active = true;
                return {
                    ...state,
                    loading: false,
                    currentStep: action.payload.step,
                    steps: action.payload.steps
                };
            } else {
                action.payload.steps.map(function (step) {
                    step.className = "";
                    return step.completed = false;
                });
                return {
                    ...state,
                    loading: false,
                    currentStep: state.currentStep,
                    steps: action.payload.steps
                };
            };


        case NEXT_STEP:

            if (state.currentStep < state.steps.length + 1) {
                steps = state.steps;
                steps[state.currentStep - 1].active = false;
                steps[state.currentStep].active = true;
            }

            return {
                ...state,
                loading: false,
                currentStep: state.currentStep + 1,
                steps: steps
            };

        case PREVIOUS_STEP:

            if (state.currentStep < state.steps.length + 1) {
                steps = state.steps;
                steps[state.currentStep - 1].active = false;
                steps[state.currentStep].active = true;
            }

            return {
                ...state,
                loading: false,
                currentStep: state.currentStep - 1,
                steps: steps
            };

        case UPDATE_STEP:

            if (state.currentStep < state.steps.length + 1) {
                steps = state.steps;
                steps[state.currentStep - 1].active = false;
                steps[action.payload.step - 1].active = true;
            }

            return {
                ...state,
                loading: false,
                currentStep: action.payload.step,
                steps: steps
            };

        case SET_COMPLETED:

            steps = state.steps;
            steps[state.currentStep - 1].completed=true;
            steps[state.currentStep - 1].className="";

            return {
                ...state,
                steps: steps
            };

        case SET_UNCOMPLETED:
        
            steps = state.steps;
            steps[state.currentStep - 1].completed=false;
            steps[state.currentStep - 1].className="error";

            return {
                ...state,
                steps: steps
            };

        case EMPTY_CHILD:
        
            steps = state.steps;
            steps.map(function (step) {
                if(step.key === action.payload.key)
                    step.className = "error";
                    return step.completed = false;
            });

            return {
                ...state,
                steps: steps,
                data: {
                    ...state.data,
                    [action.payload.key]: {}
                }
            };

        case UPDATE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.key]: action.payload.data
                }
            };
        case DISABLE_BUTTON:
            return {
                ...state,
                disabled: true
            };
        case ACTIVATE_BUTTON:
            return {
                ...state,
                disabled: false
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}