import Legal from '../../src/components/legal';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = datosEmpresaJSON;

const store = mockStore(initialState);

const legal = Enzyme.shallow(<Provider store={store}><Legal /></Provider>);

describe('<Legal />', () => {
  test('dispatches event to show legal data', () => {
    expect(legal).toMatchSnapshot(); 
    expect(legal.props().value.storeState.name).toMatch(/Wifibytes S.L/);
    expect(legal.props().value.storeState.textos).toHaveLength(13);
    expect(store.getActions()).toMatchSnapshot();
    
  });
});