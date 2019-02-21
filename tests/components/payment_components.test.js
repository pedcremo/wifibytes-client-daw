import Payment from '../../src/components/checkout/childComponents/payment/payment';
import DirectDebitForm from '../../src/components/checkout/childComponents/payment/paymentTypes/DirectDebit';
import MastercardVisaAmericanExpressForm from '../../src/components/checkout/childComponents/payment/paymentTypes/MastercardVisaAmericanExpress';
import PaymentOptions from '../../src/components/checkout/childComponents/payment/paymentTypes/paymentOptions';
import Efectivo from '../../src/components/checkout/childComponents/payment/paymentTypes/Efectivo';
import Summary from '../../src/components/checkout/childComponents/payment/paymentTypes/Summary';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import idioma from '../../src/i18n/spanish.json';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const translate = {
  t: (value) => {
    return idioma[value];
  },
};
const initialState = {
  paymentMethod:3,
  paymentMethods:[],
  showModal:false,
  form:[],
  submittedAtLeastOnce:false,
  personalDataForm:{
    datosPersonales: {
      nombre:"Prueba",
      apellido: "Prueba",
      email:"prueba@emial.com",
      ciudad:"prueba",
      codpostal:"prueba",
      direccion:"prueba"
    },
  },
  translate,
};

const store = mockStore(initialState);

const state = {
  translate,
};
const payment = Enzyme.shallow(<Provider store={store}><Payment {...state}/></Provider>);
const DirectDebit = Enzyme.shallow(<Provider store={store}><DirectDebitForm {...state}/></Provider>);
const MastercardVisaAmericanExpress = Enzyme.shallow(<Provider store={store}><MastercardVisaAmericanExpressForm {...state}/></Provider>);
const PaymentOptionsC = Enzyme.shallow(<Provider store={store}><PaymentOptions {...state}/></Provider>);
const Efectivoc = Enzyme.shallow(<Provider store={store}><Efectivo {...state}/></Provider>);
const Summaryc = Enzyme.shallow(<Provider store={store}><Summary {...state} /></Provider>);

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
    
    it("Payment render", () => {
        payment.render();
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

    it("DirectDebit render", () => {
        DirectDebit.render();
    });

    it("MastercardVisaAmericanExpress snapshot is done", () => {
        expect(MastercardVisaAmericanExpress).toMatchSnapshot(); 
    });

    it("MastercardVisaAmericanExpress render must be called and it works properly", () => {
        expect(MastercardVisaAmericanExpress).toHaveLength(1);
    });

    it("MastercardVisaAmericanExpress render", () => {
        MastercardVisaAmericanExpress.render();
    });

    it("PaymentOptions snapshot is done", () => {
        expect(PaymentOptionsC).toMatchSnapshot(); 
    });

    it("PaymentOptions render must be called and it works properly", () => {
        expect(PaymentOptionsC).toHaveLength(1);
    });

    // it("PaymentOptions render", () => {
    //     PaymentOptionsC.PaymentOptionsRadioButton(initialState);
    // });

    it("Efectivo snapshot is done", () => {
        expect(Efectivoc).toMatchSnapshot(); 
    });

    it("Efectivo render must be called and it works properly", () => {
        expect(Efectivoc).toHaveLength(1);
    });

    it("Efectivo render", () => {
        Efectivoc.render();
    });

    it("Summary snapshot is done", () => {
        expect(Summaryc).toMatchSnapshot(); 
    });

    it("Summary render must be called and it works properly", () => {
        expect(Summaryc).toHaveLength(1);
    });

    it("Summary render", () => {
        Summaryc.render();
    });
});