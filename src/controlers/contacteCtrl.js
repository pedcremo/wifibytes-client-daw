import {get} from '../utils';
import {Settings} from '../settings';

class ContacteControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            document.querySelector('#main').innerHTML = response;
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default ContacteControler;
