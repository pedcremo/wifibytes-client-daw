import {Router} from "./router.js"; //Knows what to do for every single URL 
import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Contacte from "./components/contacte";
import Cookies from "./components/cookies";
import Legal from "./components/legal";
import Rates from "./components/rates";
import Company from "./components/company";
import Catalog from "./components/catalog/catalog";
import VegasCarousel from "./components/vegasCarousel";
import RateDetail from "./components/rateDetail";
import LogIn from "./components/login/login";
import Register from "./components/login/register";
import ForgotPassword from "./components/login/forgotPasword";
import {Utils} from "./utils";
import React from 'react'; 
import ReactDOM from 'react-dom';

let vc; //VegasCarousel instance when we change route we destroy the caraousel

Router
.add(/contacte/, function() {
    ReactDOM.render(<Contacte />, document.getElementById("main"));
})
.add(/cookies/, function() {
    ReactDOM.render(<Cookies />, document.getElementById("main"));
})
.add(/legal/, function() {
    ReactDOM.render(<Legal />, document.getElementById("main")); 
})
.add(/rates/, function() {
    ReactDOM.render(<Rates />, document.getElementById("main"));
    Promise.all([ Utils.get("/tarifa/?activo=true"),  Utils.get("/tarifa_descriptor"), Utils.get("/datos_empresa")]).then(function(results) {       
      try {vc = new VegasCarousel(results[2],"body");}catch(e){console.log(e);}
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
  })
.add(/rate\/(.*)/, function() {
    console.log("rate details")
    ReactDOM.render(<RateDetail idRate={arguments[0]}/>, document.getElementById("main"));
  })
.add(/singin/, function() {
    ReactDOM.render(<LogIn/>, document.getElementById("main"));
})
.add(/register/, function() {
  ReactDOM.render(<Register/>, document.getElementById("main"));
})
.add(/forgotpassword/, function() {
  ReactDOM.render(<ForgotPassword/>, document.getElementById("main"));
})
.add(/company/, function() {
    Utils.get("/datos_empresa").then(function(response) {         
      new Company(response,"#main"); 
    }).catch(function(error) {
      console.log("Failed!", error);
    });   
})
.add(/catalog/, function() {
   /* Promise.all([ Utils.get("/familia"),  Utils.get("/filtros"), Utils.get("/articulo")]).then(function(results) {
        new Catalog(results,"#main"); 
    }).catch(function(error) {
        console.log("Failed!", error);
    }); */  
    ReactDOM.render(<Catalog />, document.getElementById("main")); 
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    //Promise.all([get("/tarifa/?destacado=true"), get("/datos_empresa"),get("/home",filterPruneArrayByLang)]).then(function(results) {
    Promise.all([ Utils.get("/tarifa/?destacado=true"),  Utils.get("/datos_empresa"), Utils.get("/home",[ Utils.filterPruneArrayByLang,"lang"])]).then(function(results) {
     
      // three promises resolved 
      ReactDOM.render(<Navbar />, document.querySelector("nav"));
      ReactDOM.render(<Home />, document.getElementById("main"));
      try {ReactDOM.render(<Footer />,document.querySelector('.page-footer'))}catch(e){console.log(e);}
      try {vc = new VegasCarousel(results[1],"body");}catch(e){console.log(e);}
    })
    .catch(function(error) {
      // One or more promises was rejected
      console.log("Failed!", error);
    });
})
.listen(function(){ //Everytime we change route
    if (vc) vc.hide(); //Hide carousel 
    //changeBreadcrumb(Router.getFragment());
})
;

document.addEventListener("DOMContentLoaded", function() {    
    Utils.setUserLanguage(); //We set the language if it not stored in a cookie otherwise we load from cookie
    Router.navigate("home");
});

