import {Router} from './router.js'; //Knows what to do for every single URL 
import Home from './components/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Contacte from './components/contacte';
import Cookies from './components/cookies';
import Legal from './components/legal';
import Rates from './components/rates';
import Company from './components/company';
import Catalog from './components/catalog';

import VegasCarousel from './components/vegasCarousel';
import {get, setUserLanguage,filterPruneArrayByLang} from './utils';
let vc; //VegasCarousel instance 

Router
.add(/contacte/, function() {
  console.log("Contacte");
  get('/datos_empresa').then(function(response) {           
    new Contacte(response,"#main");  
  }).catch(function(error) {
    console.log("Failed!", error);
  });
})
.add(/cookies/, function() {
  console.log("Cookies");
  get('/datos_empresa').then(function(response) {         
    new Cookies(response,"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/legal/, function() {
  console.log("Legal Advice");
  get('/datos_empresa').then(function(response) {         
    new Legal(response,"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/rates/, function() {
    console.log("Full rates list");//tarifa_descriptor
    Promise.all([get('/tarifa/?activo=true'), get('/tarifa_descriptor'),get('/datos_empresa')]).then(function(results) {       
      new Rates(results,"#main"); 
      try {vc = new VegasCarousel(results[2],"body");}catch(e){console.log(e)}
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
  })
.add(/company/, function() {
    console.log("Company brief");
    get('/datos_empresa').then(function(response) {         
      new Company(response,"#main"); 
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
})
.add(/catalog/, function() {
    console.log("Catalog");
    Promise.all([get('/familia'), get('/filtros'),get('/articulo')]).then(function(results) {
        new Catalog(results,"#main"); 
    }).catch(function(error) {
        console.log("Failed!", error);
    });   
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    Promise.all([get('/tarifa/?destacado=true'), get('/datos_empresa'),get('/home',filterPruneArrayByLang)]).then(function(results) {
      // three promises resolved
      let tarifaDatosEmpresa={
        ...results[0],...results[2]
      }; 
    
      let datosEmpresaHome={
        ...results[1],...results[2]
      }; 
      
      //console.log("tarifaDatosEmpresa->" + JSON.stringify(tarifaDatosEmpresa))
      try {new Navbar(results[1],'nav');}catch(e){console.log(e)}
      
      try {new Home(tarifaDatosEmpresa,"#main"); }catch(e){console.log(e)}
      try {new Footer(datosEmpresaHome,"footer");}catch(e){console.log(e)}
      try {vc = new VegasCarousel(results[1],"body");}catch(e){console.log(e)}
      
      //console.log(results);
    })
    .catch(function(error) {
      // One or more promises was rejected
      console.log("Failed!", error);
    });
})
.listen(function(){ //Everytime we change route
    if (vc) vc.hide();
    console.log("HIDE CAROUSEL");
})
;

document.addEventListener("DOMContentLoaded", function(event) {    
    setUserLanguage(); 
    Router.navigate("home");
});

