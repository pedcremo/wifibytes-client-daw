import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/home.html';

class HomeControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
        document.querySelector("div.jumbotron").style.display="block";
        try{document.getElementById('main').innerHTML =template;}catch(e){console.log("error")};
       
    }
}
export default HomeControler;
