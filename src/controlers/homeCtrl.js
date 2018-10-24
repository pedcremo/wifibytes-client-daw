import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/home.html';

class HomeControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
     
        try{document.getElementById('main').innerHTML =template;}catch(e){console.log("error")};
       
    }
}
export default HomeControler;
