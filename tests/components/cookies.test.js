import Cookies from '../../src/components/cookies';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import React from 'react';
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
Utils.get.mockResolvedValue(datosEmpresaJSON); 
Utils.getUserLang.mockReturnValue("va");
const cookies = Enzyme.shallow(<Cookies />);
it("We can check if Cookies component called the class constructor", () => {
  expect(cookies).toMatchSnapshot(); 
  expect(cookies.html()).toMatch(/i personalitzar el nostre lloc web de conformitat amb els seus interessos/);
});