import Footer from "../../src/components/footer";
import React from 'react';
import {Utils} from '../../src/utils';
import datosEmpresaJSON from "../json_endpoints/datos_empresa.json";
import homeJSON from "../json_endpoints/home.json";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');

const resp1 = datosEmpresaJSON;
const resp2 = homeJSON;
Utils.get.mockResolvedValueOnce(resp1);
Utils.get.mockResolvedValueOnce(resp2);            
Utils.get.mockResolvedValue(resp1);
const footer = Enzyme.shallow(<Footer />);


describe('<footer />', () => {

  it("We can check if Footer component called the class constructor", () => {
    expect(footer).toMatchSnapshot();
  });
  
  it("Footer render must be called and it works properly", () => {
      expect(footer.find('.footer-copyright').exists()).toBe(true);
      expect(footer.find('#companyName').getElement().props.children).toBe("Wifibytes S.L");
      expect(footer.find('.left_box').getElement().props.dangerouslySetInnerHTML.__html).toMatch(/<p>Vols donar-te de baixa/);
  });
});
