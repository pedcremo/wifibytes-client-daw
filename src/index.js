import {Router} from './router.js'; //Knows what to do for every single URL 
import HomeControler from './components/homeCtrl';
import NavbarControler from './components/navbarCtrl';
import FooterControler from './components/footerCtrl';
import ContacteControler from './components/contacteCtrl';
import CookiesControler from './components/cookiesCtrl';
import LegalControler from './components/legalCtrl';
import VegasCarouselControler from './components/vegasCarouselCtrl';

import {get} from './utils';

Router
.add(/contacte/, function() {
  console.log("Contacte");
  VegasCarouselControler.hide();
  get('/datos_empresa').then(function(response) {           
    new ContacteControler(JSON.parse(response),"#main");  
  }).catch(function(error) {
    console.log("Failed!", error);
  });
}).listen()
.add(/cookies/, function() {
  console.log("Cookies");
  VegasCarouselControler.hide();
  get('/datos_empresa').then(function(response) {         
    new CookiesControler(JSON.parse(response),"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/legal/, function() {
  console.log("Legal Advice");
  VegasCarouselControler.hide();
  get('/datos_empresa').then(function(response) {         
    new LegalControler(JSON.parse(response),"#main"); 
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
      new HomeControler(tarifaList,"#main");   
      //SHOW jumbotron in case it is hidden
      try{ 
        VegasCarouselControler.render()
      } catch(e){
        console.log(e+" Error: Jumbotron not DOM loaded yet")
      };      
    }).catch(function(error) {
      console.log("Failed!", error);
    });
});

//Fill header and footer
let datos_empresa = get('/datos_empresa').then(function(response) {   
    new NavbarControler(JSON.parse(response),'nav');
    new FooterControler(JSON.parse(response),'footer');    
}).catch(function(error) {
    console.log("Failed!", error);
});

document.addEventListener("DOMContentLoaded", function(event) {    
     Router.navigate("#home");
});

