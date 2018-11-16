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
  get('/datos_empresa').then(function(response) {           
    new Contacte(JSON.parse(response),"#main");  
  }).catch(function(error) {
    console.log("Failed!", error);
  });
})
.add(/cookies/, function() {
  console.log("Cookies");
  get('/datos_empresa').then(function(response) {         
    new Cookies(JSON.parse(response),"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/legal/, function() {
  console.log("Legal Advice");
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
    Promise.all([get('/tarifa/?destacado=true'), get('/datos_empresa'),get('/home')]).then(function(results) {
      // three promises resolved
      let tarifaDatosEmpresa={
        ...JSON.parse(results[0]),
        ...JSON.parse(results[2])
      }; 
    
      let datosEmpresaHome={
        ...JSON.parse(results[1]),
        ...JSON.parse(results[2])
      }; 
      console.log("datosEmpresaHome->" + JSON.stringify(datosEmpresaHome))
      new Navbar(JSON.parse(results[1]),'nav');
      new Home(tarifaDatosEmpresa,"#main"); 
      new Footer(datosEmpresaHome,'footer');
      VegasCarousel.render();
      //console.log(results);
    })
    .catch(function(error) {
      // One or more promises was rejected
      console.log("Failed!", error);
    });
})
.listen(function(){ //Everytime we change route
    VegasCarousel.hide();
    console.log("HIDE CAROUSEL");
})
;

document.addEventListener("DOMContentLoaded", function(event) {    
     Router.navigate("#home");
});

