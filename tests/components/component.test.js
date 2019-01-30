import Component from "../../src/components/component";
import datosEmpresaJSON from "../json_endpoints/datos_empresa.json";
const $ = require('jquery');

beforeEach(()=> {
    // Set up our document body
  document.body.innerHTML =
  `<body>
        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div id="main" class="container-fluid pb-25 mb-25">          
            
        </div>        
     </body>   
        `;            
});
it("We check if Component called the class constructor", () => {
    const navbarIns = new Component(datosEmpresaJSON,"#main"); 
    expect(navbarIns.constructor.name).toBe("Component");
});

it('Component must fail due to target html tag to render in doesnt exist', () => { 
    expect(function(){new Component(datosEmpresaJSON,"#mmain")}).toThrowError(/Error/i);    
  });
  
it('Component must fail due to JSON input doesnt contains expected information', () => { 
    expect(function(){new Component(undefined,"#main")}).toThrowError(/undefined/);    
});  

describe("2 points  -> PASS Component method checkURL exists and works properly TESTING",() => {
    test("We check Component method checkURL exists and works properly", () => {
        const component = new Component(datosEmpresaJSON,"#main"); 
        expect(component.checkURL).toBeDefined();
        const badFormedURL = "facebook.com/wifibytes";
        const wellFormedURL = "http://facebook.com/wifibytes";
        expect(component.checkURL(badFormedURL)).not.toBe(badFormedURL);
        expect(component.checkURL(wellFormedURL)).toBe(wellFormedURL);
        let reURL= /(http:\/\/|https:\/\/)/;
        expect(component.checkURL(badFormedURL)).toMatch(reURL);
        
    });
});