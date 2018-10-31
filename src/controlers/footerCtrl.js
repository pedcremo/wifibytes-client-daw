import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/footer';

class FooterControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
        get(Settings.baseURL+'/datos_empresa').then(function(response) {              
            let datosEmpresa=JSON.parse(response);                
            try{document.querySelector("footer").innerHTML=template(datosEmpresa)
            }catch(e){
                console.log(e+" Error rendering footer template")
            };
            
        }).catch(function(error) {
            console.log("Failed!", error);
        });        
        
    }
};

export default FooterControler;
