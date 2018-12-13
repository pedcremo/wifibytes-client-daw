import Legal from '../../src/components/legal';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import React from 'react';
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
Utils.get.mockResolvedValue(datosEmpresaJSON); 
Utils.getUserLang.mockReturnValue("va");
const legal = Enzyme.shallow(<Legal />);
it("We can check if Cookies component called the class constructor", () => {
  expect(legal).toMatchSnapshot(); 
  expect(legal.html()).toMatch(/i acceptat les presents condicions i el que les estengui la normativa legal aplicable en aquesta/);
});