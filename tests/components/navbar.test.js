import React from 'react';
import {Utils} from '../../src/utils';
import Navbar from '../../src/components/navbar';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import ReactDOM from 'react-dom';
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
const mockOnChange = jest.fn();


const nav = Enzyme.shallow(<Provider store={store}><Navbar onChange={mockOnChange} /></Provider>);

beforeEach(() => {
  // Set up our document body
  document.body.innerHTML =
      `<select id="langPicker" className="selectpicker" data-width="fit" value={this.state.value} onChange={this.handleLangPicker}>
          <option value='english'>English</option>
          <option value='spanish' >Español</option>
          <option value='valencia' >Valencià</option>
      </select>`;
});
describe('<Navbar />', () => {
  test('dispatches event to show navbar data', () => {
    expect(nav).toMatchSnapshot(); 
    expect(nav.props().value.storeState.textos).toHaveLength(13);
  });

  test('We can check if the handleLangPicker change', () => {
    nav.find(Navbar).last().simulate('change', {target: {value:"english"}});
    expect(mockOnChange.mock.calls.length).toEqual(1);
  });
});