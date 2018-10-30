import {Router} from './router.js'; //Knows what to do for every single URL 
import HomeControler from './controlers/homeCtrl';
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
    document.querySelector('a.navbar-brand').innerHTML ='<img width="64px" height="64px" src="'+datosEmpresa.logo+'" />'+ datosEmpresa.name;
    document.querySelector('footer p').innerHTML = datosEmpresa.name;            
}).catch(function(error) {
    console.log("Failed!", error);
});
HomeControler.render();

