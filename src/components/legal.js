class Legal {

    constructor(datosEmpresaJSON,selectRule) {         
        let selectedTarget;
        try{       
            let legalTexts= datosEmpresaJSON.textos.filter((itemText) => {
                return itemText.key.match(/legal/i);
              }).map((item,index) => {
                  return item.content;
            });    
            selectedTarget=document.querySelector(selectRule);
			if (selectedTarget) selectedTarget.innerHTML=this.render(legalTexts);
            else throw("Error. Selected output target for component "+this.constructor.name+" doesn't exist");
        }catch(e){
            if (selectedTarget) selectedTarget.innerHTML="Problems rendering "+this.constructor.name+" -> "+e;
			throw e;
        };        
    }
  
    /** render  */
    render(legalTexts) {
        return `
            ${legalTexts.join("")}
        `;      
    }
};

export default Legal; 
