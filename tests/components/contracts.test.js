import Contracts from '../../src/components/contracts/contracts';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter  from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import * as datosContractsAction from '../../src/actions/datosContractsAction';
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
        const selectedActions = [
          {
            'type': 'GET_CONTRACT_BEGIN'
          },
        ];
    
        store.dispatch(datosContractsAction.getContractsBegin());
        expect(store.getActions()).toEqual(selectedActions);
    });

    it('Dispatches the correct action and payload', () => {
        const store = mockStore(initialState);
        const selectedActions = [
          {
            'type': 'GET_CONTRACT_SUCCESS',
            'payload': {
                status: [{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]
            },
          },
        ];
    
        store.dispatch(datosContractsAction.getContractsSuccess([{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]));
        expect(store.getActions()).toEqual(selectedActions);
    });

    it('Dispatches the correct action and payload', () => {
        const store = mockStore(initialState);
        const selectedActions = [
          {
            'type': 'GET_CONTRACT_FAILURE',
            'payload': {
                error: "Error"
            },
          },
        ];
    
        store.dispatch(datosContractsAction.getContractsFailure('Error'));
        expect(store.getActions()).toEqual(selectedActions);
    });

});

describe('Reducer', () => {
    /*it('should return the initial state', () => {
        expect(datosContractsReducer(undefined, {})).toEqual(
            {
                loading: false,
                error: null
            }
        )
    })*/

    it('should handle GET_CONTRACT_BEGIN', () => {
        expect(
            datosContractsReducer([], {
                type: datosContractsAction.GET_CONTRACT_BEGIN,
                payload: null
            })
        ).toEqual(
            {
                loading: true,
                error: null
            }
        )
    })

    it('should handle GET_CONTRACT_SUCCESS', () => {
        expect(
            datosContractsReducer([], {
                type: datosContractsAction.GET_CONTRACT_SUCCESS,
                payload: {status:[{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]}
                
            })
        ).toEqual(
            {
                loading: false,
                items: [{title:"tv",content:'content tv'},{title:"movil",content:'content movil'}]
            }
        )
    })

    it('should handle GET_CONTRACT_FAILURE', () => {
        expect(
            datosContractsReducer([], {
                type: datosContractsAction.GET_CONTRACT_FAILURE,
                payload: 'Error'
                
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