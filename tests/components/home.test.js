import Home from "../../src/components/home";
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import homeJSON from "../json_endpoints/home.json";
import tarifaJSON from "../json_endpoints/tarifa.json";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

const $ = require("jquery");

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
jest.mock('../../src/utils');

it("We can check if Home component called the class constructor", () => {
  const resp1 = homeJSON;
  const resp2 = tarifaJSON;
  Utils.get.mockResolvedValueOnce(resp1);
  Utils.get.mockResolvedValueOnce(resp2);
  const home = Enzyme.shallow(<Home />);
  console.log(Utils.get());
  /* const homeIns=new Home([tarifaJSON,homeJSON],"#main"); 
  expect(homeIns.constructor.name).toBe("Home"); */
});

/* it("Home render must be called and it works properly", () => {
  new Home([tarifaJSON,homeJSON],"#main"); 
  expect($("#main").children.length).toBeGreaterThan(1);    
});

it("Component must fail due to target html tag to render in doesnt exist", () => { 
  expect(function(){new Home([tarifaJSON,homeJSON],"#mmain");}).toThrowError(/Error/i);    
});

it("Component must fail due to JSON input doesnt contains expected information", () => { 
  expect(function(){new Home(undefined,"#main");}).toThrowError(/undefined/);    
});   */