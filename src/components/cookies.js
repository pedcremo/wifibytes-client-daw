/** @module ComponentsApp */

import Component from "./component";
/**
 * @class
 * Draw cookies text information
 */
class Cookies extends Component {
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(datosEmpresaJSON,selectRule) {   
        super(datosEmpresaJSON,selectRule);
        let cookiesTexts = this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/cookies/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return item.content;
        });       
        this.state={
            cookiesTexts:cookiesTexts
        };
        this.selectedTarget.innerHTML=this.render(cookiesTexts);
    }
   
    /** render  */
    render() {
        return `
            <div class="p-5">
                ${this.state.cookiesTexts.join("")}
            </div>
        `;          
    }
}

export default Cookies; 
