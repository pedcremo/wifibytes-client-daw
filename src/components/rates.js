import Component from "./component";
import RateBoxSubComponent from "./rateBoxSubcomponent";

class Rates extends Component {

    constructor(activeRatesJSON, selectRule) {
        super(activeRatesJSON, selectRule);
        this.selectedTarget.innerHTML = this.render(this.inputJSON);
    }

    /** render  */
    render(ratesJSON) {
        const tarifesDescription=ratesJSON[1];
        
        /** Bizarre way to iterate over caja_ text on tarifa_descriptor endpoint. Sometimes I feel a strong 
         * impulse to kill the brilliant mind behind some server bits of code. Idioma is not coded like other parts
         * Indeed there is at all any kind of coherence in server side how to deal with i18n. In this very case language used
         * is codified using numbers. Now try to guess witch number matches with witch language and try do do generic code to not 
         * crash easily
         * **/ 
        let boxArray = [];
        for (let [key, value] of Object.entries(tarifesDescription[0])) {            
            if (key.startsWith("caja")) {
                let groups=key.match(/caja_([\d]*)_([\w]*)/)
                if (!boxArray[groups[1]]) boxArray[groups[1]]={};                
                boxArray[groups[1]][groups[2]]=value;
            }
        }
        //Filter empty element and construct cards with rates additional information
        boxArray = boxArray.filter((item)=>{
            return (item!=null || item!=undefined);
        }).map((item) => {
            return `
                <div class="card">
                    <div class="card-header">
                        <img src="${item.icono}" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold text-uppercase"> ${item.titulo}</h5>
                        <p class="card-text">${item.texto}</p>
                    </div>
                </div>
                `;
        });

      

        return `
        <div class="p-5">
            <h1 class="glow text-center pt-1">${tarifesDescription[0].pretitulo}</h1>
            <h1 class="glow text-center pt-1">${tarifesDescription[0].titulo}</h1>
            
            <div class="card-columns mt-5 mb-5">
                ${new RateBoxSubComponent(ratesJSON[0]).render()}
                
            </div>
            <div class="card-deck mt-2 mb-5">
                ${boxArray.join("")}
            <div>
        </div>
       
        `;
    }
}
export default Rates;
