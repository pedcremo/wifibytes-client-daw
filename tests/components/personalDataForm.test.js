import React from 'react';
import PersonalDataForm from '../../src/components/personalData/personalDataForm';

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

const component = shallow(<Provider store={store}><PersonalDataForm/></Provider>);
/* https: //airbnb.io/enzyme/docs/api/ */
describe('<PersonalDataForm>', () => {
    
   
    it('PersonalDataForm has been rendered correctly', () => {
        expect(component).toHaveLength(1);
    });
    
    it('We can check if PersonalDataForm component called to its constructor', () => {
        expect(component).toMatchSnapshot();
    });

    it('renders three <PersonalDataForm /> components', () => {
        expect(component.find('#name')).to.have.lengthOf(1);
    });
   
})


