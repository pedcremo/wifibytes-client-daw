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
            transition: "fade",
            transitionDuration: 3000,
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
    }
    
    getTemplate(content) {
        return `
        <div id="previous" class="col-sm-1">
         <i class='fas fa-3x fa-angle-left'></i>
        </div>
        <div class="col-sm-10">
            <h2 id="banner">${content}</h2>
        </div>
        <div id="next" class="col-sm-1">
         <i class='fas fa-3x fa-angle-right'></i>
        </div>
    
        `;
    }
}
export default VegasCarousel;
