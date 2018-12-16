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
import {Utils} from "./utils";
import React from 'react';
import ReactDOM from 'react-dom';

////////////Redux && Thunk imports

import { Provider } from "react-redux";
import { store } from "./store";

////////////Redux && Thunk code
/* const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
); */

/* 
  render(
    <Provider store={store}>
      <wifibytesApp />
    </Provider>,
    document.getElementById('root')
  ) */


let vc; //VegasCarousel instance when we change route we destroy the caraousel

Router
.add(/contacte/, function() {
    ReactDOM.render(<Contacte />, document.getElementById("main"));
})
.add(/cookies/, function() {
    ReactDOM.render( <Provider store={store}><Cookies /></Provider>, document.getElementById("main"));
    /* ReactDOM.render(<Cookies />, document.getElementById("main")); */
})
.add(/legal/, function() {
    ReactDOM.render( <Provider store={store}><Legal /></Provider>, document.getElementById("main"));
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
    ReactDOM.render(<Provider store={store}><RateDetail idRate={arguments[0]}/></Provider>, document.getElementById("main"));
  })
.add(/company/, function() {
    Utils.get("/datos_empresa").then(function(response) {
      new Company(response,"#main");
    }).catch(function(error) {
      console.log("Failed!", error);
    });
})
.add(/catalog/, function() {
    
    ReactDOM.render(<Catalog />, document.getElementById("main")); 
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    //Promise.all([get("/tarifa/?destacado=true"), get("/datos_empresa"),get("/home",filterPruneArrayByLang)]).then(function(results) {
    Promise.all([ Utils.get("/tarifa/?destacado=true"),  Utils.get("/datos_empresa"), Utils.get("/home",[ Utils.filterPruneArrayByLang,"lang"])]).then(function(results) {


      
      ReactDOM.render(<Provider store={store}><Navbar /></Provider>, document.querySelector("nav"));
      ReactDOM.render(<Home />, document.getElementById("main"));
      ReactDOM.render( <Provider store={store}><Footer /></Provider>, document.querySelector('.page-footer'));
   // ReactDOM.render(<Footer />,document.querySelector('.page-footer'));
     

    })
    .catch(function(error) {
      // One or more promises was rejected
      console.log("Failed!", error);
    });
})
.listen(function(){ //Everytime we change route
    if (vc) vc.hide(); //Hide carousel    
})
;

document.addEventListener("DOMContentLoaded", function() {
    Utils.setUserLanguage(); //We set the language if it not stored in a cookie otherwise we load from cookie
    Router.navigate("home");
});
