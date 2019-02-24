import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import * as paymentActions from '../../src/actions/paymentActions';
import getpayments from '../json_endpoints/checkout_payment';
import reducerPayment from '../../src/reducers/paymentReducer';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
    paymentMethod:3,
    paymentMethods:[],
    showModal:false,
    form:[],
    submittedAtLeastOnce:false, 
};

const store = mockStore(initialState);

describe('<Payment />', () => { 

    it('Dispatches action, test set Completed', () => {
        const selectedActions = [
          {
            'type': 'SET_COMPLETED',
          },
        ];
        store.clearActions()
        store.dispatch(paymentActions.setCompleted());
        expect(store.getActions()).toEqual(selectedActions);
    }); 

    it('Dispatches action, test set Uncompleted', () => {
        const selectedActions = [
          {
            'type': 'SET_UNCOMPLETED',
          },
        ];
        store.clearActions()
        store.dispatch(paymentActions.setUncompleted());
        expect(store.getActions()).toEqual(selectedActions);
    });

    it('Dispatches action, test get payments BEGIN', () => {
        const selectedActions = [
          {
            'type': 'GET_PAYMENTS_BEGIN'
          },
        ];
        store.clearActions()
        store.dispatch(paymentActions.getPaymentsBegin());
        expect(store.getActions()).toEqual(selectedActions);
    });  

    it('Dispatches action, test payment SUCCESS', () => {
        const selectedActions = [
          {
            'type': 'GET_PAYMENTS_SUCCESS',
            'payload': {'formasdepago': getpayments}
          },
        ];
        store.clearActions()
        store.dispatch(paymentActions.getPaymentsSuccess(getpayments));
        expect(store.getActions()).toEqual(selectedActions);
    });  

    it('Dispatches action, test payment FAILURE', () => {
        const selectedActions = [
          {
            'type': 'GET_PAYMENTS_FAILURE',
            'payload': {'error': "This is an error"}
          },
        ];
        store.clearActions()
        store.dispatch(paymentActions.getPaymentsFailure('This is an error'));
        expect(store.getActions()).toEqual(selectedActions);
    });  
    
    it('Test reducer default method payment', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': '',
            })
        ).toEqual(
            {  
                'form':[],
                'submittedAtLeastOnce':false,
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false
            }
        )
    })

    it('Update field test payment', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'UPDATE_FIELD',
                'value': 'This is a test',
                'field': 'Testing'
            })
        ).toEqual(
            {  
                'form':[],
                'submittedAtLeastOnce':false,
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false,
                'Testing': 'This is a test'
            }
        )
    })

    it('Update reducer method payment', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'PAYMENT_METHOD_UPDATE',
                'value': 1
            })
        ).toEqual(
            {  
                'form':[],
                'submittedAtLeastOnce':false,
                "paymentMethod": 1, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false
            }
        )
    })

    it('Get payments reducer', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'GET_PAYMENTS_BEGIN',
            })
        ).toEqual(
            {  
                'form':[],
                'submittedAtLeastOnce':false,
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false,
                "loading":true,
                "error":null
            }
        )
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'GET_PAYMENTS_SUCCESS',
                "payload": {"formasdepago": getpayments}
            })
        ).toEqual(
            {  
                "form": [], 
                "loading": false, 
                "paymentMethod": 3, 
                "paymentMethods": [
                    {"codpago": 2,"nombre": "Efectivo","descripcion": "Efectivo","cod_eneboo": "2"},
                    {"cod_eneboo": "2", "codpago": 3, "descripcion": "A través del banco", "nombre": "Domiciliación Bancaria"}, 
                    {"cod_eneboo": "1", "codpago": 1, "descripcion": "Stripe", "nombre": "Visa / Mastercard / American Express"}
                ], 
                "showModal": false, 
                "submittedAtLeastOnce": false
            }
        )
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'GET_PAYMENTS_FAILURE',
                'payload': 'This is a error test'
            })
        ).toEqual(
            {  
                "form": [], 
                "loading": false, 
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false,
                "error": "This is a error test",
            }
        )
    })

});