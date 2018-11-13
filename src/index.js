import {Router} from './router.js'; //Knows what to do for every single URL 
import Home from './components/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Contacte from './components/contacte';
import Cookies from './components/cookies';
import Legal from './components/legal';
import VegasCarousel from './components/vegasCarousel';

import {get} from './utils';

Router
.add(/contacte/, function() {
  console.log("Contacte");
  VegasCarousel.hide();
  get('/datos_empresa').then(function(response) {           
    new Contacte(JSON.parse(response),"#main");  
  }).catch(function(error) {
    console.log("Failed!", error);
  });
}).listen()
.add(/cookies/, function() {
  console.log("Cookies");
  VegasCarousel.hide();
  get('/datos_empresa').then(function(response) {         
    new Cookies(JSON.parse(response),"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/legal/, function() {
  console.log("Legal Advice");
  VegasCarousel.hide();
  get('/datos_empresa').then(function(response) {         
    new Legal(JSON.parse(response),"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
    //HomeControler.render();
    get('/tarifa/?destacado=true').then(function(response) {              
      let tarifaList=JSON.parse(response);                
      new Home(tarifaList,"#main");   
      //SHOW jumbotron in case it is hidden
      try{ 
        VegasCarousel.render()
      } catch(e){
        console.log(e+" Error: Jumbotron not DOM loaded yet")
      };      
    }).catch(function(error) {
      console.log("Failed!", error);
    });
});

//Fill header and footer
let datos_empresa = get('/datos_empresa').then(function(response) {   
    new Navbar(JSON.parse(response),'nav');
    new Footer(JSON.parse(response),'footer');    
}).catch(function(error) {
    console.log("Failed!", error);
});

document.addEventListener("DOMContentLoaded", function(event) {    
     Router.navigate("#home");
});

