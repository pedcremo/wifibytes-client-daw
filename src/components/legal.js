import Component from "./component";

class Legal extends Component{

    constructor(datosEmpresaJSON,selectRule) {   
        super(datosEmpresaJSON,selectRule);
        let legalTexts= this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/legal/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return item.content;
        });  
        this.selectedTarget.innerHTML=this.render(legalTexts);   
    }
  
    /** render  */
    render(legalTexts) {
        return `
            <div class="p-5">
                ${legalTexts.join("")}
            </div>
        `;      
    }
};

export default Legal; 
