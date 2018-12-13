import React from 'react';
import {Utils} from '../../src/utils';
import Navbar from '../../src/components/navbar';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

const $ = require('jquery');

jest.mock('../../src/utils');
const resp1 = datosEmpresaJSON;

Utils.get.mockResolvedValueOnce(resp1);
Utils.get.mockResolvedValue(resp1);
const nav = Enzyme.shallow(<Navbar />);

beforeEach(() => {
  // Set up our document body
  document.body.innerHTML =
      `<select id="langPicker" className="selectpicker" data-width="fit" value={this.state.value} onChange={this.handleLangPicker}>
          <option value='english'>English</option>
          <option value='spanish' >Español</option>
          <option value='valencia' >Valencià</option>
      </select>`;
});

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("We can check if Navbar component called the class constructor", () => {
  const wrapper = Enzyme.shallow(<Navbar />);
  expect(wrapper).toMatchSnapshot();
});

it('We check if data has been printed', () => {
  expect(nav.find('a[href="#/catalog"]').getElement().props.children).toHaveLength(3);
});

it('We can check if the handleLangPicker change', () => {
  nav.find('select').simulate('change', {target: {value:"english"}});
  expect(nav.render().find('select [selected]').val()).toEqual('english');
});