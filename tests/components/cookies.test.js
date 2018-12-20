import Cookies from '../../src/components/cookies';
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

const cookies = Enzyme.shallow(<Provider store={store}><Cookies /></Provider>);

describe('<Cookies />', () => {
  test('dispatches event to show legal data', () => {
    expect(cookies).toMatchSnapshot(); 
    expect(cookies.props().value.storeState.name).toMatch(/Wifibytes S.L/);
    expect(cookies.props().value.storeState.textos).toHaveLength(13);
    expect(store.getActions()).toMatchSnapshot();
    
  });
});
