import Component from "./component";

class Cookies extends Component {

    constructor(datosEmpresaJSON,selectRule) {   
        super(datosEmpresaJSON,selectRule);
        let cookiesTexts = this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/cookies/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return item.content;
        });       
        this.selectedTarget.innerHTML=this.render(cookiesTexts);
    }
   
    /** render  */
    render(cookiesTexts) {
        return `
            <div class="p-5">
                ${cookiesTexts.join("")}
            </div>
        `;          
    }
};

export default Cookies; 
