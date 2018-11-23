import Home from "../../src/components/home";
import tarifaJSON from "../json_endpoints/tarifa.json";
import homeJSON from "../json_endpoints/home.json";


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

it("We can check if Home component called the class constructor", () => {
  const homeIns=new Home([tarifaJSON,homeJSON],"#main"); 
  expect(homeIns.constructor.name).toBe("Home");
});

it("Home render must be called and it works properly", () => {
  new Home([tarifaJSON,homeJSON],"#main"); 
  expect($("#main").children.length).toBeGreaterThan(1);    
});

it("Component must fail due to target html tag to render in doesnt exist", () => { 
  expect(function(){new Home([tarifaJSON,homeJSON],"#mmain");}).toThrowError(/Error/i);    
});

it("Component must fail due to JSON input doesnt contains expected information", () => { 
  expect(function(){new Home(undefined,"#main");}).toThrowError(/undefined/);    
});  

/*describe("2 PTS -> PASS Color rates boxes and internal font awesome icons according to color in backend rate information",()=>{
  test("Step1 ->  By defaut Filter by lang property", () => { 
    const homeIns=new Home([tarifaJSON,homeJSON],"#main")
    expect($('.card-title').length).toBe(3);
    $( ".card-title" ).each(function( index ) {
      console.log( index + "->"+ $(this).css("backgroundColor") );
      expect($(this).css("backgroundColor")).toBe("EEE");
    });
  });

});*/