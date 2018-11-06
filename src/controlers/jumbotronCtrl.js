import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/jumbotron.js';

class JumbotronControler {

    constructor() {
        
    }
 
    static hide(){
        
            document.querySelector("#carousel").style.display="none";
    }
    /** render  */
    static render() {
        //Show jumbotron section
        try{ 
            document.querySelector("#carousel").style.display="block";
        }catch(e){}
        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            try{document.querySelector("#carousel").innerHTML =template(datosEmpresa);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default JumbotronControler;
