import Home from '../../src/components/home';
import tarifaJSON from '../json_endpoints/tarifaDatosEmpresa.json';

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

it('We can check if Home component called the class constructor', () => {
  const homeIns = new Home(tarifaJSON,"#main"); 
  expect(homeIns.constructor.name).toBe('Home');
});

it('Home render must be called and it works properly', () => {
  let homwIns=new Home(tarifaJSON,"#main"); 
  expect($('#main').children.length).toBeGreaterThan(1);    
});

it('Component must fail due to target html tag to render in doesnt exist', () => { 
  expect(function(){new Home(tarifaJSON,"#mmain")}).toThrowError(/Error/i);    
});

it('Component must fail due to JSON input doesnt contains expected information', () => { 
  expect(function(){new Home(undefined,"#main")}).toThrowError(/undefined/);    
});  