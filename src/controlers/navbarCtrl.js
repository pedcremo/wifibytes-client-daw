import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/navbar';

class NavbarControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {   
        get(Settings.baseURL+'/datos_empresa').then(function(response) {              
            let datosEmpresa=JSON.parse(response);                
            try{document.querySelector("nav").innerHTML=template(datosEmpresa)}catch(e){
                console.log(e+ " Error rendering navbar template")
            };
            
        }).catch(function(error) {
            console.log("Failed!", error);
        });     
        
    }
};

export default NavbarControler;