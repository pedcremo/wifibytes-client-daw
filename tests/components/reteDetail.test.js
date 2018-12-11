import RateDetail from '../../src/components/rateDetail';
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import tarifaJSON from "../json_endpoints/tarifa.json";
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const resp = tarifaJSON;

Utils.get.mockResolvedValue(resp);

beforeEach(()=> {
    // Set up our document body
  document.body.innerHTML =
    `<body>
        <div id="main" >            
           
        </div>      
        
        <!-- Footer -->
        <footer class="page-footer font-small bg-light pt-4 mt-5">
        <!-- Inject here template footer-->
        </footer>
    </body>   
    `;   
});

it('We can check if render in rateDetail it works properly', () => {
    // ReactDOM.render(<RateDetail idRate="1"/>, document.getElementById("main"));
    // expect($('#main').children.length).toBeGreaterThan(1);
    const rate = Enzyme.shallow(<RateDetail />);
    expect(home).toMatchSnapshot();

});

// it('Component must fail due to target html tag to render in doesnt exist', () => {
//     ReactDOM.render(<RateDetail idRate="1"/>, document.getElementById("mmain"));
//     expect($('#main').children.length).toThrowError(/Error/i);
// });

// it('Cookies render must be called and it works properly', () => {
//   let cookiesIns=new Cookies(datosEmpresaJSON,"#main"); 
//   expect($('#main').children.length).toBeGreaterThan(1);    
// });

// it('Component must fail due to target html tag to render in doesnt exist', () => { 
//   expect(function(){new Cookies(datosEmpresaJSON,"#mmain")}).toThrowError(/Error/i);    
// });

// it('Component must fail due to JSON input doesnt contains expected information', () => { 
//   expect(function(){new Cookies(undefined,"#main")}).toThrowError(/undefined/);    
// });