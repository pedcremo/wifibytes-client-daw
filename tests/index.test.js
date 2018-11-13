const index=require('../src/index.js');
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
        

function fakeDOMLoaded() {
  const fakeEvent = document.createEvent('Event');

  fakeEvent.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(fakeEvent);
}

fakeDOMLoaded();
  
});

test('First test select index load footer', () => {
  //console.log("$('footer').children.length=>"+$('footer').children.length);
  expect($('footer').children.length).toBeGreaterThan(1);    
});

test('Second test navbar filled', () => {
  //console.log("$('nav').children.length=>"+$('nav').children.length);
  expect($('footer').children.length).toBeGreaterThan(1);    
});

test('Third main section filled', () => {
  //console.log("$('#main').children.length=>"+$('main').children.length);
  expect($('main').children.length).toBeGreaterThan(1);    
});