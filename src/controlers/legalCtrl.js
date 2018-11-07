import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/legal';
import VegasCarouselControler from './vegasCarouselCtrl';

class LegalControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
       
        //Hide vegas 
        VegasCarouselControler.hide();

        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            let legalTexts= datosEmpresa.textos.filter((itemText) => {
                return itemText.key.match(/legal/i);
              }).map((item,index) => {
                  return item.content;
            });
            try{document.getElementById('main').innerHTML =template(legalTexts);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
};

export default LegalControler; 
