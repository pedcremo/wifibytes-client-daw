import {Router} from './router.js'; //Knows what to do for every single URL 
import HomeControler from './controlers/homeCtrl';

Router
.add(/contacte/, function() {
  console.log("Contacte");
}).listen()
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
});

HomeControler.render();

