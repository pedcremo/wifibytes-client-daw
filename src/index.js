import {Router} from './router.js'; //Knows what to do for every single URL 
import HomeControler from './controlers/homeCtrl';
import NavbarControler from './controlers/navbarCtrl';
import FooterControler from './controlers/footerCtrl';
import ContacteControler from './controlers/contacteCtrl';
import {Settings} from './settings';
import {get} from './utils';

Router
.add(/contacte/, function() {
  console.log("Contacte");
  ContacteControler.render();
}).listen()
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
    HomeControler.render();
});

//Fill header and footer
let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {   
    let datosEmpresa=JSON.parse(response);
    console.log(datosEmpresa);
    NavbarControler.render();
    FooterControler.render();    
}).catch(function(error) {
    console.log("Failed!", error);
});

document.addEventListener("DOMContentLoaded", function(event) {    
    HomeControler.render();    
});

