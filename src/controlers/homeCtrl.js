import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/home';

class HomeControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
        console.log("ESTEM EN RENDER DE HOME CONTROLLER");
        get(Settings.baseURL+'/tarifa/?destacado=true').then(function(response) {  
            
            let tarifaList=JSON.parse(response);                
            try{document.getElementById('main').innerHTML =template(tarifaList);}catch(e){console.log("Error: Can't render template home")};
            
        }).catch(function(error) {
            console.log("Failed!", error);
        });
        //SHOW jumbotron in case it is hidden
        try{document.querySelector("div.jumbotron").style.display="block";} catch(e){console.log("Error: Jumbotron not DOM loaded yet")};      
    }
}
export default HomeControler;
