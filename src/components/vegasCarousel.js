//import {get} from "../utils";
import Component from "./component";

class VegasCarousel extends Component {

    constructor(datosEmpresaJSON,selectRule) {
        super(datosEmpresaJSON, selectRule);
        this.render();
    }
 
    /** Hide-kill vegas carousel */
    hide() {
        try{
            $("body").vegas("destroy");
        }catch(e){
           // throw e;
        }        
    }
    /** render  */
    render() {
        //Fill vegas background with jumbotron texts from datos_empresa endpoint 
        let slidesBack= this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/jumbotron/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return {src: item.image,content:item.content};
          });
        let that=this;

        $("body").vegas({
            delay: 15000,
            timer: false,              
            //firstTransition: 'fade',
            //firstTransitionDuration: 10000,                
            transition: "fade",
            transitionDuration: 3000,
            //animation: 'kenburns',
            slides: slidesBack,
            walk: function (index, slideSettings) {
                const homeBanner = document.querySelector(".home-banner");
                if (homeBanner) homeBanner.innerHTML=that.getTemplate(slideSettings.content);                
            }
        });

        $(document).on("click", "div#previous", function() {
            $("body").vegas("previous");
        });

        $(document).on("click", "div#next", function() {   
            $("body").vegas("next");
        });
        /*get("/datos_empresa").then(function(response) {           
            let datosEmpresa=JSON.parse(response);
            let slidesBack= datosEmpresa.textos.filter((itemText) => {
                return itemText.key.match(/jumbotron/i);
              }).map((item) => {
                  return {src: item.image,content:item.content};
              });

            $("body").vegas({
                delay: 15000,
                timer: false,              
                //firstTransition: 'fade',
                //firstTransitionDuration: 10000,                
                transition: "fade",
                transitionDuration: 3000,
                //animation: 'kenburns',
                slides: slidesBack,
                walk: function (index, slideSettings) {
                    //console.log("Slide index " + index + " image " + slideSettings.content);
                    document.querySelector(".home-banner").innerHTML=VegasCarousel.getTemplate(slideSettings.content);
                    
                }
            });
            $(document).on("click", "div#previous", function() {
                $("body").vegas("previous");
            });
 
            $(document).on("click", "div#next", function() {   
                $("body").vegas("next");
            });
          }).catch(function(error) {
            console.log("Failed!", error);
          });*/
    }
    
    getTemplate(content) {
        return `
        <div id="previous" class="col-sm-1">
         <i class='fas fa-3x fa-angle-left'></i>
        </div>
        <div class="col-sm-10">
            <h1 id="banner">${content}</h1>
        </div>
        <div id="next" class="col-sm-1">
         <i class='fas fa-3x fa-angle-right'></i>
        </div>
    
        `;
    }
}
export default VegasCarousel;
