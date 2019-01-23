import SignaturePad from '../../src/components/signaturePad';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
    showPad: false
};

const store = mockStore(initialState);
const signaturePad = Enzyme.shallow(<Provider store={store}><SignaturePad /></Provider>);

describe('<SignaturePad />', () => {

    it("SignaturePad snapshot is done", () => {
        expect(signaturePad).toMatchSnapshot(); 
    });

    it("SignaturePad render must be called and it works properly", () => {
        expect(signaturePad).toHaveLength(1);
    });
    
    it("ShowPad must be false", () => {
        expect(signaturePad.props().value.storeState.showPad).toBe(false);
    });

});