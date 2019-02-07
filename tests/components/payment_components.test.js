import Payment from '../../src/components/checkout/childComponents/payment/payment';
import DirectDebitForm from '../../src/components/checkout/childComponents/payment/paymentTypes/DirectDebit';
import MastercardVisaAmericanExpressForm from '../../src/components/checkout/childComponents/payment/paymentTypes/MastercardVisaAmericanExpress';
import PaymentForm from '../../src/components/checkout/childComponents/payment/paymentTypes/paymentForm';
import PaymentOptions from '../../src/components/checkout/childComponents/payment/paymentTypes/paymentOptions';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

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

const payment = Enzyme.shallow(<Provider store={store}><Payment /></Provider>);
const DirectDebit = Enzyme.shallow(<Provider store={store}><DirectDebitForm /></Provider>);
const MastercardVisaAmericanExpress = Enzyme.shallow(<Provider store={store}><MastercardVisaAmericanExpressForm /></Provider>);
const PaymentFormC = Enzyme.shallow(<Provider store={store}><PaymentForm /></Provider>);
const PaymentOptionsC = Enzyme.shallow(<Provider store={store}><PaymentOptions /></Provider>);

describe('<Payment />', () => {

    it("Payment snapshot is done", () => {
        expect(payment).toMatchSnapshot(); 
    });

    it("Payment render must be called and it works properly", () => {
        expect(payment).toHaveLength(1);
    });
    
    it("Store must contain a default paymentMethod", () => {
        expect(payment.props().value.storeState.paymentMethod).toBe(3);
    });
    
    it("Store snapshot is done", () => {
        expect(store.getActions()).toMatchSnapshot();
    });

    it("DirectDebit snapshot is done", () => {
        expect(DirectDebit).toMatchSnapshot(); 
    });

    it("DirectDebit render must be called and it works properly", () => {
        expect(DirectDebit).toHaveLength(1);
    });

    it("MastercardVisaAmericanExpress snapshot is done", () => {
        expect(MastercardVisaAmericanExpress).toMatchSnapshot(); 
    });

    it("MastercardVisaAmericanExpress render must be called and it works properly", () => {
        expect(MastercardVisaAmericanExpress).toHaveLength(1);
    });

    it("PaymentForm snapshot is done", () => {
        expect(PaymentFormC).toMatchSnapshot(); 
    });

    it("Payment render must be called and it works properly", () => {
        expect(PaymentFormC).toHaveLength(1);
    });

    it("PaymentOptions snapshot is done", () => {
        expect(PaymentOptionsC).toMatchSnapshot(); 
    });

    it("PaymentOptions render must be called and it works properly", () => {
        expect(PaymentOptionsC).toHaveLength(1);
    });

});