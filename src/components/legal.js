import Component from "./component";
/**
 * Draw legal texts
 */
class Legal extends Component{
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(datosEmpresaJSON,selectRule) {   
        super(datosEmpresaJSON,selectRule);
        let legalTexts= this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/legal/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return item.content;
        });  
        this.state={
            legalTexts:legalTexts
        };
        this.selectedTarget.innerHTML=this.render(legalTexts);   
    }
  
    /** render  */
    render() {
        return `
            <div class="p-5">
                ${this.state.legalTexts.join("")}
            </div>
        `;      
    }
}

export default Legal; 
