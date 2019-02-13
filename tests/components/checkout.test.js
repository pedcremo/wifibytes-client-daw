import Checkout from '../../src/components/checkout/checkout';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import * as checkoutActions from '../../src/constants/actionTypes';
import currentCheckout from '../../src/reducers/checkoutReducer';
// import {
//     ADD_STEPS,
//     NEXT_STEP,
//     PREVIOUS_STEP,
//     UPDATE_STEP
// } from '../../src/constants/actionTypes';


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
    currentStep: 1,
    steps: [
        {
            key: "personal_data",
            active: true,
            completed: false,
            title: "Dades Personals"
        },
        {
            key: "contract",
            active: false,
            completed: false,
            title: "Contracte"
        },
        { 
            key: "confirm",
            active: false,
            completed: false,
            title: "Confirmar Pedido"
        }
    ]
};

const store = mockStore(initialState);

const checkout = Enzyme.shallow(<Provider store={store}><Checkout /></Provider>);

describe('<Checkout />', () => {

    it("Checkout snapshot is done", () => {
        expect(checkout).toMatchSnapshot(); 
    });

    it("Checkout render must be called and it works properly", () => {
        expect(checkout).toHaveLength(1);
    });
    
    it("Store must contain a currentStep", () => {
        expect(checkout.props().value.storeState.currentStep).toBe(1);
    });
    
    it("Store snapshot is done", () => {
        expect(store.getActions()).toMatchSnapshot();
    });

    it('Dispatches the correct action and payload', () => {
        const selectedActions = [
          {
            'type': 'UPDATE_STEP',
            'payload': {
                step: 1
            },
          },
        ];
    
        store.dispatch(checkoutActions.setStep(1));
        expect(store.getActions()).toEqual(selectedActions);
    });  

    it('Dispatches the correct action and payload', () => {
        const store = mockStore(initialState);
        const add = [
        {
            'type': 'ADD_STEPS',
            'payload': {
                step: 1,
                steps: initialState.steps
            },
        },
        ];

        store.dispatch(checkoutActions.addSteps(1, initialState.steps));
        expect(store.getActions()).toEqual(add);
    });

});

describe('Reducer', () => {
    it('should return the initial state', () => {
        expect(currentCheckout(undefined, {})).toEqual(
            {
                currentStep: 0,
                data: {},
                disabled: true,
                steps: [],
                loading: false,
            }
        )
    })

    it('should handle ADD_STEPS', () => {
        expect(
            currentCheckout([], {
                type: checkoutActions.ADD_STEPS,
                payload: {
                    currentStep: undefined,
                    steps: ['pas1', 'pas2']
                }
            })
        ).toEqual(
            {
                currentStep: undefined,
                steps: ['pas1', 'pas2'],
                loading: false
            }
        )
    })

    it('should handle UPDATE_STEP', () => {
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(), 
                {
                type: checkoutActions.UPDATE_STEP,
                payload: {
                    step: 2,
                    steps: [
                        {
                            key: 'personal_data',
                            active: false,
                            completed: false,
                            title: 'Dades Personals',
                        },
                        {
                            key: 'contract',
                            active: true,
                            completed: false,
                            title: 'Contracte',
                        },
                        { 
                            key: 'confirm',
                            active: false,
                            completed: false,
                            title: 'Confirmar Pedido' 
                        },
                    ]
                }
            })
        ).toEqual({
                currentStep: 2, 
                loading: false,
                steps: [
                    {
                        key: 'personal_data',
                        active: false,
                        completed: false,
                        title: 'Dades Personals',
                    },
                    {
                        key: 'contract',
                        active: true,
                        completed: false,
                        title: 'Contracte',
                    },
                    { 
                        key: 'confirm',
                        active: false,
                        completed: false,
                        title: 'Confirmar Pedido' 
                    },
                ]
            }
        )  
    })

    it('should handle NEXT_STEP', () => {
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(), 
            {
                type: checkoutActions.NEXT_STEP,
                payload: {
                    step: 1,
                    steps: [
                        {
                            key: 'personal_data',
                            active: true,
                            completed: false,
                            title: 'Dades Personals',
                        },
                        {
                            key: 'contract',
                            active: true,
                            completed: false,
                            title: 'Contracte',
                        },
                        { 
                            key: 'confirm',
                            active: false,
                            completed: false,
                            title: 'Confirmar Pedido' 
                        },
                    ]
                }
            }
            )
        ).toEqual(
            {
                currentStep: 2, 
                loading: false,
                steps: [
                    {
                        key: 'personal_data',
                        active: false,
                        completed: false,
                        title: 'Dades Personals',
                    },
                    {
                        key: 'contract',
                        active: true,
                        completed: false,
                        title: 'Contracte',
                    },
                    { 
                        key: 'confirm',
                        active: false,
                        completed: false,
                        title: 'Confirmar Pedido' 
                    },
                ]
            }
        )
    })

    it('should handle PREVIOUS_STEP', () => {
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(),
            {
                type: checkoutActions.PREVIOUS_STEP,
                payload: {
                    step: 1,
                    steps: [
                        {
                            key: 'personal_data',
                            active: false,
                            completed: false,
                            title: 'Dades Personals',
                        },
                        {
                            key: 'contract',
                            active: true,
                            completed: false,
                            title: 'Contracte',
                        },
                        { 
                            key: 'confirm',
                            active: false,
                            completed: false,
                            title: 'Confirmar Pedido' 
                        },
                    ]
                }
            }
            )
        ).toEqual(
            {
                currentStep: 0, 
                loading: false,
                steps: [
                    {
                        key: 'personal_data',
                        active: false,
                        completed: false,
                        title: 'Dades Personals',
                    },
                    {
                        key: 'contract',
                        active: true,
                        completed: false,
                        title: 'Contracte',
                    },
                    { 
                        key: 'confirm',
                        active: false,
                        completed: false,
                        title: 'Confirmar Pedido' 
                    },
                ]
            }
        )

    })
});
