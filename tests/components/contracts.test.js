import Contracts from '../../src/components/checkout/childComponents/contracts/contracts';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter  from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { GET_CONTRACTS } from '../../src/constants/actionTypes';
import datosContractsReducer from '../../src/reducers/datosContractsReducer'

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const initialState = {
    loading: true,
    error: null
};

const store = mockStore(initialState);

const contracts = Enzyme.shallow(<Provider store={store}><Contracts /></Provider>);

describe('<Contracts />', () => {

    it("Contracts snapshot is done", () => {
        expect(contracts).toMatchSnapshot(); 
    });

    it("Contracts render must be called and it works properly", () => {
        expect(contracts).toHaveLength(1);
    });

    it("Store must contain a loading", () => {
        expect(contracts.props().value.storeState.loading).toBe(true);
    });

    it("Store snapshot is done", () => {
        expect(store.getActions()).toMatchSnapshot();
    });

    it('Dispatches the correct action and payload', () => {
        const store = mockStore(initialState);
        const selectedActions = [
          {
            'type': 'GET_CONTRACTS',
            'response': {
                contracts: [{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]
            },
          },
        ];
    
        store.dispatch({type: 'GET_CONTRACTS', response:{contracts: [{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]}});
        expect(store.getActions()).toEqual(selectedActions);
    });

    it('Dispatches the correct action and payload', () => {
        const store = mockStore(initialState);
        const selectedActions = [
          {
            'type': 'GET_CONTRACTS',
            'response': {
                error: "Error"
            },
          },
        ];
    
        store.dispatch({type: 'GET_CONTRACTS', response:{error: "Error"}});
        expect(store.getActions()).toEqual(selectedActions);
    });

});

describe('Reducer', () => {

    it('should handle GET_CONTRACTS', () => {
        expect(
            datosContractsReducer([], {
                type: GET_CONTRACTS,
                response: {contracts:[{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]}
                
            })
        ).toEqual(
            {
                loading: false,
                items: [{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}],
                error: false
            }
        )
    })

    it('should handle GET_CONTRACTS', () => {
        expect(
            datosContractsReducer([], {
                type: GET_CONTRACTS,
                response: {error:"Error"}
                
            })
        ).toEqual(
            {
                loading: false,
                error: 'Error',
                items: []
            }
        )
    })

});