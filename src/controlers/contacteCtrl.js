import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/contacte.js';

class ContacteControler {

    constructor() {
        
    }
 
    /** render  */
    static render() {
        //Hide jumbotron section 
        document.querySelector("div.jumbotron").style.display="none";
        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            try{document.getElementById('main').innerHTML =template(datosEmpresa);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default ContacteControler;
