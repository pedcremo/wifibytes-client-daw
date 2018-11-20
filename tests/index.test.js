const index=require('../src/index.js');
const $ = require('jquery');
const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    onload: jest.fn(),
    onerror: jest.fn(),
    status: 200,
    response: JSON.stringify(
        [
            { title: "test post" },
            { title: "second test post" }
        ]
    ),
    statusText: "Server not ready"
};
let oldXMLHttpRequest;

afterEach(() => {
    //window.XMLHttpRequest = oldXMLHttpRequest;
});

beforeEach(()=> {
    //oldXMLHttpRequest = window.XMLHttpRequest;
    //window.XMLHttpRequest = jest.fn(() => mockXHR);
    // Set up our document body
  document.body.innerHTML =
  `<body>
        <!-- Inject here template navbar-->
        <nav class="navbar navbar-expand-lg bg-white navbar-light border-bottom border-dark">
          
        </nav>
        
        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div id="main" class="container-fluid pb-25 mb-25">          
            
        </div>        
        
        <!-- Inject here template footer-->
        <footer class="page-footer font-small bg-light pt-4 mt-5">
        
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
  console.log($('footer').text()); 
});

test('Second test navbar filled', () => {
  //console.log("$('nav').children.length=>"+$('nav').children.length);
  expect($('nav').children.length).toBeGreaterThan(1);    
  console.log($('nav').text()); 
});

test('Third main section filled', () => {
  //console.log("$('#main').children.length=>"+$('main').children.length);
  expect($('main').children.length).toBeGreaterThan(1);    
});