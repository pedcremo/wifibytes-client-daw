import PortabilidadForm from '../../src/components/checkout/childComponents/personalData/portabilidadForm';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import * as actions from '../../src/constants/actionTypes';
import personalDataFormReducer from '../../src/reducers/personalDataFormReducer';



Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {};

const store = mockStore(initialState);
const component = Enzyme.shallow(<Provider store={store}><PortabilidadForm /></Provider>);

describe('<PortabilidadForm />', () => {

    it("PortabilidadForm snapshot is done", () => {
        expect(component).toMatchSnapshot(); 
    });

    it("PortabilidadForm render must be called and it works properly", () => {
        expect(component).toHaveLength(1);
    });
    
    it("Store snapshot is done", () => {
        expect(store.getActions()).toMatchSnapshot();
    });

    it("Store must contain a currentStep", () => {
        expect(component.props().value.storeState.currentStep).toBe(1);
    });
    
});
