import Legal from '../../src/components/legal';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import React from 'react';
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const mockStore = configureStore();
const initialState = datosEmpresaJSON;
Utils.getUserLang.mockReturnValue("va");

const store = mockStore(initialState);

const legal = Enzyme.shallow(<Provider store={store}><Legal /></Provider>);
/* it("We can check if Cookies component called the class constructor", () => {
  expect(legal).toMatchSnapshot(); 
  expect(legal.html()).toMatch(/i acceptat les presents condicions i el que les estengui la normativa legal aplicable en aquesta/);
}); */

describe('<Legal />', () => {
  test('dispatches event to show legal data', () => {
    expect(legal).toMatchSnapshot(); 
    expect(legal.props().value.storeState.name).toMatch(/Wifibytes S.L/);
    expect(legal.props().value.storeState.textos).toHaveLength(13);
    expect(store.getActions()).toMatchSnapshot();
    
  });
});