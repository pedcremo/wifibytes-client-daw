export const ADD_STEPS = 'ADD_STEPS';
export const UPDATE_STEP = 'UPDATE_STEP';

export const addSteps = (step, steps) => ({
    type: ADD_STEPS,
    payload: {
        step,
        steps
    }
});

export const updateStep = step => ({
    type: UPDATE_STEP,
    payload: {
        step
    }
});