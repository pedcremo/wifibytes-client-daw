import Home from "../../src/components/home";
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import homeJSON from "../json_endpoints/home.json";
import tarifaJSON from "../json_endpoints/tarifa.json";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const resp1 = homeJSON;
const resp2 = tarifaJSON;

Utils.get.mockResolvedValueOnce(resp1);
Utils.get.mockResolvedValueOnce(resp2);            
Utils.get.mockResolvedValue(resp1);

beforeEach(()=> {
    // Set up our document body
  document.body.innerHTML =
  `<body>
        <nav class="navbar navbar-expand-lg bg-white navbar-light border-bottom border-dark">
          <!-- Inject here template navbar-->
        </nav>
        
        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div id="main" class="container-fluid pb-25 mb-25">          
            
        </div>        
        
        <!-- Footer -->
        <footer class="page-footer font-small bg-light pt-4 mt-5">
        <!-- Inject here template footer-->
        </footer>
     </body>   
      `;
      
     
});

it("We can check if Home component called the class constructor", () => {
  /*Promise.all([ Utils.get("/tarifa/?destacado=true"),  Utils.get("/datos_empresa"), Utils.get("/home",[ Utils.filterPruneArrayByLang,"lang"])]).then(function(results) {
     console.log(results);
  });*/
  const home = Enzyme.shallow(<Home />);
  expect(home).toMatchSnapshot();

});

it("Home render must be called and it works properly", () => {
  const home = Enzyme.shallow(<Home />);
  expect(home.find('div')).toHaveLength(1);
});
