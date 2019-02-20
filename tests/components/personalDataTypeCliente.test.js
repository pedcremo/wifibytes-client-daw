import React from 'react';
import typeCliente from '../../src/components/checkout/childComponents/personalData/typeCliente';
import * as actionTypes from '../../src/actions/personalDataFormActions';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { shallow, mount, configure } from "enzyme";

/* import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';
 */
configure({
    adapter: new Adapter()
});
const mockStore = configureStore();
const initialState = {
    personalDataForm:
    {
        fields: [],
        loaded: false,
        error: []
    }
};
const store = mockStore(initialState);

const component = shallow(<Provider store={store}><typeCliente/></Provider>);
/* https: //airbnb.io/enzyme/docs/api/ */
describe('<typeCliente>', () => {
    
   
    it('typeCliente has been rendered correctly', () => {
        expect(component).toHaveLength(1);
    });
    
    it('We can check if typeCliente component called to its constructor', () => {
        expect(component).toMatchSnapshot();
    });
})


