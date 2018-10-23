import {Router} from './router.js'; //Knows what to do for every single URL 
import {get} from './utils';

let hostBase='https://backend.wifibytes.com';

Router
.add(/datos_empresa/, function() {
  get(hostBase+'/datos_empresa').then(function(response) {
    console.log("Success!", response);
    document.getElementById("result").innerHTML = response;
  }).catch(function(error) {
    console.log("Failed!", error);
  });
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.check('/products/12/edit/22').listen();

Router.navigate(/datos_empresa/);

/** Once the page is loaded we get a context app object an generate students rank view if we are logged otherwise show login template. */
$(document).ready(function(){
    
});