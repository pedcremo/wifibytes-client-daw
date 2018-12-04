import {Router} from "./router.js"; //Knows what to do for every single URL 
import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Contacte from "./components/contacte";
import Cookies from "./components/cookies";
import Legal from "./components/legal";
import Rates from "./components/rates";
import Company from "./components/company";
import Catalog from "./components/catalog";
import VegasCarousel from "./components/vegasCarousel";
import RateDetail from "./components/rateDetail";
import {get, setUserLanguage,filterPruneArrayByLang,changeBreadcrumb} from "./utils";
import React from 'react'; 
import ReactDOM from 'react-dom';

let vc; //VegasCarousel instance when we change route we destroy the caraousel

Router
.add(/contacte/, function() {
  get("/datos_empresa").then(function(response) {           
    new Contacte(response,"#main");  
  }).catch(function(error) {
    console.log("Failed!", error);
  });
})
.add(/cookies/, function() {
  
  ReactDOM.render(<Cookies />, document.getElementById("main"));
  /*get('/datos_empresa').then(function(response) {          
    new Cookies(response,"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });*/   
})
.add(/legal/, function() {
  get("/datos_empresa").then(function(response) {         
    new Legal(response,"#main"); 
  }).catch(function(error) {
    console.log("Failed!", error);
  });   
})
.add(/rates/, function() {
    Promise.all([get("/tarifa/?activo=true"), get("/tarifa_descriptor"),get("/datos_empresa")]).then(function(results) {       
      new Rates(results,"#main"); 
      try {vc = new VegasCarousel(results[2],"body");}catch(e){console.log(e);}
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
  })
.add(/rate\/(.*)/, function() {
    
    Promise.all([get("/tarifa/"+arguments[0]), get("/tarifa_descriptor")]).then(function(results) {
      new RateDetail(results,"#main"); 
    }).catch(function(error) {
      console.log("Failed!", error);
    });
  })
.add(/company/, function() {
    get("/datos_empresa").then(function(response) {         
      new Company(response,"#main"); 
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
})
.add(/catalog/, function() {
    Promise.all([get("/familia"), get("/filtros"),get("/articulo")]).then(function(results) {
        new Catalog(results,"#main"); 
    }).catch(function(error) {
        console.log("Failed!", error);
    });   
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    //Promise.all([get("/tarifa/?destacado=true"), get("/datos_empresa"),get("/home",filterPruneArrayByLang)]).then(function(results) {
    Promise.all([get("/tarifa/?destacado=true"), get("/datos_empresa"),get("/home",[filterPruneArrayByLang,"lang"])]).then(function(results) {
     
      // three promises resolved 
      try {new Navbar(results[1],"nav");}catch(e){console.log(e);}
      try {new Home([results[0],results[2]],"#main"); }catch(e){console.log(e);}
      try {new Footer([results[1],results[2]],"footer");}catch(e){console.log(e);}
      try {vc = new VegasCarousel(results[1],"body");}catch(e){console.log(e);}
    })
    .catch(function(error) {
      // One or more promises was rejected
      console.log("Failed!", error);
    });
})
.listen(function(){ //Everytime we change route
    if (vc) vc.hide(); //Hide carousel 
    changeBreadcrumb(Router.getFragment());
})
;

document.addEventListener("DOMContentLoaded", function() {    
    setUserLanguage(); //We set the language if it not stored in a cookie otherwise we load from cookie
    Router.navigate("home");
});

