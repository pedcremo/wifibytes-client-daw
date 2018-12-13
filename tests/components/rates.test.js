import Rates from "../../src/components/rates";
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import tarifa_descriptorJSON from "../json_endpoints/tarifa_descriptor.json";
import tarifaJSON from "../json_endpoints/tarifa.json";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
window.$ = require('jquery');

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const resp1 = tarifa_descriptorJSON;
const resp2 = tarifaJSON;

Utils.get.mockResolvedValueOnce(resp1);
Utils.get.mockResolvedValueOnce(resp2);            
Utils.get.mockResolvedValue(resp1);

beforeEach(()=> {
  document.body.innerHTML =
    `<body>
        <nav class="navbar navbar-expand-lg bg-white navbar-light border-bottom border-dark"></nav>
        <div id="main" class="container-fluid pb-25 mb-25"></div>        
        <footer class="page-footer font-small bg-light pt-4 mt-5"></footer>
     </body>`;
});

it("We can check if Rates component called the class constructor", () => {
  const rates = Enzyme.shallow(<Rates />);
  expect(rates).toMatchSnapshot();
});

it("Rates render must be called and it works properly", () => {
  const rates = Enzyme.shallow(<Rates />);
  expect(rates.find('div')).toHaveLength(1);
});

it("When click Change Set Render", () => {
  const rates = Enzyme.shallow(<Rates />);
  rates.setState({
      rates : tarifaJSON.results,
      ratesDescription : tarifa_descriptorJSON[0],
      originalRates : tarifaJSON.results,
      originalRatesDescription : tarifa_descriptorJSON[0],
      isLoading:false
  })
  rates.find('#btn-fibra').simulate('click',{"target":{"value":3}})
  expect(rates.state('rates').length).toBe(1);
});