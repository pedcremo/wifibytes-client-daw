class LegalControler {

    constructor(datosEmpresaJSON,selectRule) {         
        try{       
            let legalTexts= datosEmpresaJSON.textos.filter((itemText) => {
                return itemText.key.match(/legal/i);
              }).map((item,index) => {
                  return item.content;
            });    
            document.querySelector(selectRule).innerHTML=this.render(legalTexts);
        }catch(e){
            console.log(e+" error")
        };        
    }
  
    /** render  */
    render(legalTexts) {
        return `
            ${legalTexts.join("")}
        `;      
    }
};

export default LegalControler; 
