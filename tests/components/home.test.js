import Home from "../../src/components/home";
import React from 'react';
import {Utils} from '../../src/utils';
import homeJSON from "../json_endpoints/home.json";
import tarifaJSON from "../json_endpoints/tarifa.json";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const resp1 = tarifaJSON;
const resp2 = homeJSON;
Utils.get.mockResolvedValueOnce(resp1);
Utils.get.mockResolvedValueOnce(resp2);
Utils.get.mockResolvedValue(resp1);
const home = Enzyme.shallow(<Home />);

describe('<home />', () => {

  it("We can check if Home component called the class constructor", () => { 
    expect(home).toMatchSnapshot();
  });
  it("We can check that data has been printed correctly", () => { 
    expect(home.find('#title').exists()).toBe(true);
    expect(home.find('#title').getElement().props.children).toBe("Alta gratis. Fibra òptica en  Bocairent, Banyeres, Agullent, Enguera i prompte en La costera ");
    expect(home.find('#left_box').getElement().props.dangerouslySetInnerHTML.__html).toMatch(/<p>Vols donar-te de baixa/);
  });

});
