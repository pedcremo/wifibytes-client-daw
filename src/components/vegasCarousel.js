import Component from "./component";

/** Class to draw a carousel in body tag using vegas jquery plugin. 
 * We get images from endpoint datos_empresa textos section
 * specifically textos with key that match jumbotron
 * In each text item we have key, content, image and lang fields
 * We filter by lang too
*/
class VegasCarousel extends Component {
    /**
     * @constructor
     * @param {JSON} datosEmpresaJSON with textos data
     * @param {string} selectRule CSS rule Where to draw the carousel 
     */    
    constructor(datosEmpresaJSON,selectRule) {
        super(datosEmpresaJSON, selectRule);
        this.render();
    }
 
    /** Hide-kill vegas carousel */
    hide() {
        try{
           //$("body").vegas("destroy");
           $(this.selectedTarget).vegas("destroy");
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

        //$("body").vegas({
       $(this.selectedTarget).vegas({
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
            $("body").vegas("pause");
            //$(this.selectedTarget).vegas("pause");
            $("body").vegas("previous");
            //$(this.selectedTarget).vegas("previous");
        });

        $(document).on("click", "div#next", function() {   
            //$(this.selectedTarget).vegas("pause");
            $("body").vegas("pause");
            //$(this.selectedTarget).vegas("next");
            $("body").vegas("next");
        });
    }
    /**
     * Create carousel text banner and navigation controls
     * When we navigate manually once, animation is stopped and only
     * is allowed to navigate using next and previous control 
     * @param {string} content 
     */
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
