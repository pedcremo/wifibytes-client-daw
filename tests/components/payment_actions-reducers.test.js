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

    it('Dispatches the correct action', () => {
        const selectedActions = [
          {
            'type': 'GET_PAYMENTS_BEGIN'
          },
        ];
    
        store.dispatch(paymentActions.getPaymentsBegin());
        expect(store.getActions()).toEqual(selectedActions);
    });  

    it('Dispatches the correct action and payload', () => {
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

    it('Update reducer method show modal, first true and after goes false ', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'SET_SHOW_MODAL_TRUE',
            })
        ).toEqual(
            {  
                'form':[],
                'submittedAtLeastOnce':false,
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": true, 
                "submittedAtLeastOnce": false
            }
        )
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'SET_SHOW_MODAL_FALSE',
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
                "paymentMethod": 1, 
                "paymentMethods": [
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

    it('Set form in reducer', () => {
        const store = mockStore(initialState);
        expect(
            reducerPayment(store.getState(), 
            {
                'type': 'SET_FORM',
                'form': "<form>This is a complete form</form>"
            })
        ).toEqual(
            {  
                "form": "<form>This is a complete form</form>", 
                "paymentMethod": 3, 
                "paymentMethods": [], 
                "showModal": false, 
                "submittedAtLeastOnce": false
            }
        )
    })


});