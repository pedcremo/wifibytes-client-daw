import Checkout from '../../src/components/checkout/checkout';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import * as checkoutActions from '../../src/actions/checkoutActions';


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
    currentStep: 1,
    steps: [
        {
            key: 'personal_data',
            active: true,
            completed: false,
            title: 'Dades Personals',
        },
        {
            key: 'contract',
            active: false,
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
    
        store.dispatch(checkoutActions.updateStep(1));
        expect(store.getActions()).toEqual(selectedActions);
    });


});