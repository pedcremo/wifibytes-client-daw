import Component from "./component";

class Company extends Component {

    constructor(datosEmpresaJSON,selectRule) { 
        super(datosEmpresaJSON,selectRule);
        //debugger;
        let companyTexts= this.inputJSON.textos.filter((itemText) => {
            return itemText.key.match(/sobre/i) && itemText.lang==this.getUserLang();
          }).map((item) => {
              return item.content;
        });   
        this.selectedTarget.innerHTML=this.render(companyTexts);
    }
  
    /** render  */
    render(companyTexts) {       
        return `
             <div class="p-5">
                ${companyTexts.join("")}
            </div>
         `;
    }
}

export default Company;