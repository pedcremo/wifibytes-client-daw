//const Contacte=require('../../src/components/contacte.js');
import Contacte from '../../src/components/contacte';
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
//var datosEmpresaJSON = require('../json_endpoints/datos_empresa.json')
//import datosEmpresaJSON from ('../json_endpoints/datos_empresa.json')

const $ = require('jquery');

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

it('We can check if Contact component called the class constructor', () => {
  const contactIns = new Contacte(datosEmpresaJSON,"#main"); 
  expect(contactIns.constructor.name).toBe('Contacte');
});

it('Contacte render must be called and it works properly', () => {
  let contactIns=new Contacte(datosEmpresaJSON,"#main"); 
  expect($('#main').children.length).toBeGreaterThan(1);    
});

it('Component must fail due to target html tag to render in doesnt exist', () => { 
  expect(function(){new Contacte(datosEmpresaJSON,"#mmain")}).toThrowError(/Error/i);    
});

it('Component must fail due to JSON input doesnt contains expected information', () => { 
  expect(function(){new Contacte(undefined,"#main")}).toThrowError(/undefined/);    
});  