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
            let slidesBack= datosEmpresa.textos.filter((itemText) => {
                return itemText.key.match(/jumbotron/i);
              }).map((item,index) => {
                  return {src: item.image}
              });

            $("body").vegas({
                delay: 15000,
                timer: false,                
                firstTransition: 'fade',
                firstTransitionDuration: 10000,
                transition: 'fade',
                transitionDuration: 10000,
                animation: 'kenburns',

                slides: slidesBack
            });
           //try{document.querySelector("#carousel").innerHTML =template(datosEmpresa);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default JumbotronControler;
