class Cookies {

    constructor(datosEmpresaJSON,selectRule) {        
        let selectedTarget;
        try{       
            selectedTarget=document.querySelector(selectRule);
            let cookiesTexts= datosEmpresaJSON.textos.filter((itemText) => {
                return itemText.key.match(/cookies/i);
              }).map((item,index) => {
                  return item.content;
            });    
            if (selectedTarget) selectedTarget.innerHTML=this.render(cookiesTexts);
            else throw("Error. Selected output target for component "+this.constructor.name+" doesn't exist");
            //document.querySelector(selectRule).innerHTML=this.render(cookiesTexts);
        }catch(e){
            if (selectedTarget) selectedTarget.innerHTML="Problems rendering "+this.constructor.name+" -> "+e;
            throw e;
        };        
    }
   
    /** render  */
    render(cookiesTexts) {
        return `
            ${cookiesTexts.join("")}
        `;          
    }
};

export default Cookies; 
