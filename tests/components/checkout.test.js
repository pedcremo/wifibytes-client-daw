import Checkout from '../../src/components/checkout/checkout';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import * as checkoutActions from '../../src/constants/actionTypes';
import currentCheckout from '../../src/reducers/checkoutReducer';
import jsdom from 'jsdom'
import I18n from "redux-i18n"
import {i18nState} from "redux-i18n"
import {Utils} from '../../src/utils'
import {translations} from "../../src/i18n/translations"
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

const initialState2 = {
    currentCheckout: {
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
        ],
        data: [],
        loading: true,
        disabled: false
    },
    cartReducer: {
        items: []
    }
};

const initialState3 = {
    currentCheckout: {
        currentStep: 1,
        steps: [],
        data: [],
        loading: false,
        disabled: false
    },
    cartReducer: {
        items: []
    }
};

const initialState4 = {
    currentCheckout: {
        currentStep: 1,
        steps: ['personalData','contracts','payment'],
        data: [],
        loading: false,
        disabled: false
    },
    cartReducer: {
        items: []
    },
    i18nState
};

const initialStateData = {
    data: {
        "cardOwner": "dfgdf df",
        "cardNumber": "2020202020",
        "expirationMonth": 2,
        "expirationYear": 2019,
        "cvv": 414
    }
}

const buttonState = {
    "currentStep": 1, 
    "data": {}, 
    "disabled": true,
    "loading": false, 
    "steps": []
}

const store = mockStore(initialState);

let checkout = Enzyme.shallow(<Provider store={store}><Checkout /></Provider>);

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

    // it('Dispatches the correct action and payload', () => {
    //     const selectedActions = [
    //       {
    //         'type': 'UPDATE_STEP',
    //         'payload': {
    //             step: 1
    //         },
    //       },
    //     ];
    
    //     store.dispatch(checkoutActions.setStep(1));
    //     expect(store.getActions()).toEqual(selectedActions);
    // });  

    // it('Dispatches the correct action and payload', () => {
    //     const store = mockStore(initialState);
    //     const add = [
    //     {
    //         'type': 'ADD_STEPS',
    //         'payload': {
    //             step: 1,
    //             steps: initialState.steps
    //         },
    //     },
    //     ];

    //     store.dispatch(checkoutActions.addSteps(1, initialState.steps));
    //     expect(store.getActions()).toEqual(add);
    // });

    it('render > if (loading)', () => {
        const store = mockStore(initialState2);
        const state = { 
            currentCheckout: {
                currentStep: 1,
                steps: ['personalData','contracts','payment'],
                data: [],
                loading: true,
                disabled: false,
            },
            cartReducer: {
                items: []
            }
        };

        checkout = Enzyme.render(<Provider store={store}><Checkout {...state}/></Provider>);
    });

    it('render > if(steps.length <= 0 && currentStep)', () => {
        const store = mockStore(initialState3);
        const state = { 
            currentCheckout: {
                currentStep: 1,
                steps: [],
                data: [],
                loading: false,
                disabled: false,
            },
            cartReducer: {
                items: []
            }
        };

        checkout = Enzyme.render(<Provider store={store}><Checkout {...state}/></Provider>);
    });

    it('render > if(steps.length > 0 && currentStep', () => {
        const store = mockStore(initialState4);
        const state = { 
            currentCheckout: {
                currentStep: 1,
                steps: ['personalData','contracts','payment'],
                data: [],
                loading: false,
                disabled: false
            },
            cartReducer: {
                items: [
                    {id: "0cab50a1-ea99-4aa4-9a49-1983f06a5614"},
                    {id: "5"},
                    {id: "0cab70a1-ea99-4aa4-9a49-1983f06a5614"}
                ]
            },
            i18nState
        };

        checkout = Enzyme.render(
            <Provider store={store}>
                <I18n translations={translations} initialLang={Utils.getCookie("language")} fallbackLang={Utils.getUserLang()}>
                    <Checkout {...state}/>
                </I18n>
            </Provider>);
    });

    /*it('sendOrder', () => {
        const checkout = Enzyme.shallow(<Provider store={store}><Checkout /></Provider>);
        //console.log(checkout.instance());
        checkout.instance().sendOrder = jest.fn();
        checkout.update();
        //console.log(checkout.instance().sendOrder._isMockFunction);
        expect(checkout.instance().sendOrder._isMockFunction).toBe(true);
    });*/

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
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(), {
                type: checkoutActions.ADD_STEPS,
                payload: {
                    currentStep: undefined,
                    steps: [
                        {
                            active: true, 
                            className: "", 
                            completed: true, 
                            key: "personal_data", 
                            title: "Dades Personals"
                        },
                        {
                            active: false, 
                            completed: false, 
                            key: "contract", 
                            title: "Contracte"
                        }
                    ]
                }
            })
        ).toEqual(
            {
                currentStep: undefined,
                steps: [
                    {
                        active: true, 
                        className: "", 
                        completed: true, 
                        key: "personal_data", 
                        title: "Dades Personals"
                    },
                    {
                        active: false, 
                        completed: false, 
                        key: "contract", 
                        title: "Contracte"
                    }
                ],
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

    it('should handle SET_COMPLETED', () => {
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(), {
                type: checkoutActions.SET_COMPLETED
            })
        ).toEqual(
            {
                currentStep: 1, 
                steps: [
                    {
                        active: false, 
                        className: "", 
                        completed: true, 
                        key: "personal_data", 
                        title: "Dades Personals"
                    }, 
                    {
                        active: true, 
                        completed: false, 
                        key: "contract", 
                        title: "Contracte"
                    }, 
                    {
                        active: false, 
                        completed: false, 
                        key: "confirm", 
                        title: "Confirmar Pedido"
                    }
                ]
            }
            
        )
    })

    it('should handle SET_UNCOMPLETED', () => {
        const store = mockStore(initialState);
        expect(
            currentCheckout(store.getState(), {
                type: checkoutActions.SET_UNCOMPLETED
            })
        ).toEqual(
            {
                currentStep: 1, 
                steps: [
                    {
                        active: false, 
                        className: "error", 
                        completed: false, 
                        key: "personal_data", 
                        title: "Dades Personals"
                    }, 
                    {
                        active: true, 
                        completed: false, 
                        key: "contract", 
                        title: "Contracte"
                    }, 
                    {
                        active: false, 
                        completed: false, 
                        key: "confirm", 
                        title: "Confirmar Pedido"
                    }
                ]
            }
            
        )
    })

    it('should handle UPDATE_DATA', () => {
        const store = mockStore(initialStateData);
        expect(
            currentCheckout(undefined, {
                type: checkoutActions.UPDATE_DATA,
                payload: {
                    key: "payment",
                    data: {
                        cardNumber: "7777777777",
                        cardOwner: "paco",        
                        expirationMonth: 2,
                        expirationYear: 2019,
                        cvv: 414
                    }
                },

            })
        ).toEqual(
            {
                currentStep: 0, 
                data: 
                {
                    payment: 
                    {
                        cardNumber: "7777777777", 
                        cardOwner: "paco",
                        expirationMonth: 2,
                        expirationYear: 2019,
                        cvv: 414
                    }
                }, 
                disabled: true, 
                loading: false, 
                steps: []
            }
            
        )
    })

    it('should handle DISABLE_BUTTON', () => {
        const store = mockStore(buttonState);
        expect(
            currentCheckout(store.getState(), {
                type: checkoutActions.DISABLE_BUTTON
            })
        ).toEqual(
            {
                currentStep: 1, 
                data: {}, 
                disabled: true, 
                loading: false, 
                steps: []
            }
        )
    })

    it('should handle ACTIVATE_BUTTON', () => {
        const store = mockStore(buttonState);
        expect(
            currentCheckout(store.getState(), {
                type: checkoutActions.ACTIVATE_BUTTON
            })
        ).toEqual(
            {
                currentStep: 1, 
                data: {}, 
                disabled: false, 
                loading: false, 
                steps: []
            }
        )
    })

});
