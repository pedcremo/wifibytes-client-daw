import Contacte from '../../src/components/contacte';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import React from 'react'; 
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure } from "enzyme";
import {Utils} from '../../src/utils';
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, mount, render } from "enzyme";

const $ = require('jquery');
jest.mock('../../src/utils');
Utils.get.mockResolvedValue(datosEmpresaJSON); 

it('Contacte render must be called and it works properly -CONTACT-', () => {
  const contactIns = shallow(<Contacte />);
  expect(contactIns).toHaveLength(1);
});

it('Contacte render must be called and it works properly -CONTACT-', () => {
  const contactIns = shallow(<Contacte />);
  expect(contactIns).toMatchSnapshot();
});

