import {get} from '../utils';
import {Settings} from '../settings';
//import {template} from '../templates/jumbotronTODELETE.js';

class VegasCarousel {

    constructor() {
        
    }
 
    /** Hide-kill vegas carousel */
    static hide() {
        try{
            $("body").vegas('destroy');
        }catch(e){
        }        
    }
    /** render  */
    static render() {

        //Fill vegas background with jumbotron texts from datos_empresa endpoint 
        
        let datos_empresa = get('/datos_empresa').then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            let slidesBack= datosEmpresa.textos.filter((itemText) => {
                return itemText.key.match(/jumbotron/i);
              }).map((item,index) => {
                  return {src: item.image,content:item.content}
              });

            $("body").vegas({
                delay: 15000,
                timer: false,                
                //firstTransition: 'fade',
                //firstTransitionDuration: 10000,                
                transition: 'fade',
                transitionDuration: 3000,
                //animation: 'kenburns',
                slides: slidesBack,
                walk: function (index, slideSettings) {
                    console.log("Slide index " + index + " image " + slideSettings.content);
                    document.getElementById("banner").innerHTML="<i class='fas fa-angle-left'></i>"+slideSettings.content+"<i class='fas fa-angle-right'></i>";
                }
            });
           //try{document.querySelector("#carousel").innerHTML =template(datosEmpresa);}catch(e){console.log("error")};
    
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default VegasCarousel;
