import RateDetail from '../../src/components/rateDetail';
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import tarifaJSON from "../json_endpoints/tarifa.json";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, mount, render } from "enzyme";

jest.mock('../../src/utils');
const resp = tarifaJSON;

Utils.get.mockResolvedValue(resp);

// beforeEach(()=> {
//     // Set up our document body
//   document.body.innerHTML =
//     `<body>
//         <div id="main" >            
           
//         </div>      
        
//         <!-- Footer -->
//         <footer class="page-footer font-small bg-light pt-4 mt-5">
//         <!-- Inject here template footer-->
//         </footer>
//     </body>   
//     `;   
// });

it('We can check if render in rateDetail it works properly', () => {
    const rendered = renderer.create(<RateDetail idRate="1"/>);
    expect(rendered.toJSON()).toMatchSnapshot();
});

it('Check if there is just one component when rendering is done', () => {
    const component = shallow(<RateDetail idRate="1" />);
    expect(component).toHaveLength(1);
});

it('Check if there is just one component when rendering is done', () => {
    const component = shallow(<RateDetail idRate="1" />);
    expect(component).toHaveLength(1);
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