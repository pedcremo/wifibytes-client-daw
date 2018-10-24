import {Router} from './router.js'; //Knows what to do for every single URL 
import HomeControler from './controlers/homeCtrl';
import ContacteControler from './controlers/contacteCtrl';

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

HomeControler.render();

