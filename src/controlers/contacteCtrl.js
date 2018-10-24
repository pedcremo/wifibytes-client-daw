import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/contacte.html';

class ContacteControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
        /**/
 
        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            try{document.getElementById('main').innerHTML =template;}catch(e){console.log("error")};
            template(datosEmpresa);

          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default ContacteControler;
