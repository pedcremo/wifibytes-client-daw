class CookiesControler {

    constructor(datosEmpresaJSON,selectRule) {        
        try{       
            let cookiesTexts= datosEmpresaJSON.textos.filter((itemText) => {
                return itemText.key.match(/cookies/i);
              }).map((item,index) => {
                  return item.content;
            });    
            document.querySelector(selectRule).innerHTML=this.render(cookiesTexts);
        }catch(e){
            console.log(e+" error")
        };        
    }
  
    /** render  */
    render(cookiesTexts) {
        return `
            ${cookiesTexts.join("")}
        `;          
    }
};

export default CookiesControler; 
