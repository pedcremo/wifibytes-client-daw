import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/cookies';
import VegasCarouselControler from './vegasCarouselCtrl';

class CookiesControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
       
        //Hide vegas 
        VegasCarouselControler.hide();

        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            let cookiesTexts= datosEmpresa.textos.filter((itemText) => {
                return itemText.key.match(/cookies/i);
              }).map((item,index) => {
                  return item.content;
            });
            try{document.getElementById('main').innerHTML =template(cookiesTexts);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
};

export default CookiesControler; 
