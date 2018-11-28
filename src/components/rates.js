import Component from "./component";
import RateBoxSubComponent from "./rateBoxSubcomponent";
/**
 * Draw active rates
 */
class Rates extends Component {
    /**
     * @constructor
     * @param {json} activeRatesJSON 
     * @param {string} selectRule 
     */
    constructor(activeRatesJSON, selectRule) {
        super(activeRatesJSON, selectRule);
        
        this.state = {  
            rates:this.inputJSON[0].results,
            ratesDescription:this.inputJSON[1][0]
        };
        this.selectedTarget.innerHTML = this.render();
        this.attachEvents();
        $("#btn-All" ).addClass("active");
    }
    attachEvents(){
        let optionButtons = document.querySelectorAll("button.nav-item");
        [].forEach.call(optionButtons, (optionButton) => {
            optionButton.addEventListener("click", this.handleFamilyPicker.bind(this), false);
        });
        //$("button.nav-item").on("click",this.handleFamilyPicker.bind(this));
        
    }
    handleFamilyPicker(event){
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
        let tipo_tarifa=parseInt(event.target.value);
        if (tipo_tarifa>0){
            let filteredRates= this.inputJSON[0].results.filter((item)=>{
                let subs=item.subtarifas.filter((subItem) => {
                    if (subItem.tipo_tarifa==tipo_tarifa) return subItem;
                });
                if (subs.length>0) return item;
            });            
            this.setState({
                rates:filteredRates
            }); 
        }else {
            this.setState({  
                rates:this.inputJSON[0].results,
                ratesDescription:this.inputJSON[1][0]
            });
        }
        this.attachEvents();
            
        $("button.nav-item").find("button.active").removeClass("active");
        $("#"+event.target.id ).addClass("active");
    }

    /** render  array with two JSON, rates and rates description */
    render() {
        
        /** Bizarre way to iterate over caja_ text on tarifa_descriptor endpoint. Sometimes I feel a strong 
         * impulse to kill the brilliant mind behind some server bits of code. Idioma is not coded like other parts
         * Indeed there is at all any kind of coherence in server side how to deal with i18n. In this very case language used
         * is codified using numbers. Now try to guess witch number matches with witch language and try do do generic code to not 
         * crash easily
         * **/ 
        let boxTextsArray = [];
        for (let [key, value] of Object.entries(this.state.ratesDescription)) {            
            if (key.startsWith("caja")) {
                let groups=key.match(/caja_([\d]*)_([\w]*)/)
                if (!boxTextsArray[groups[1]]) boxTextsArray[groups[1]]={};                
                boxTextsArray[groups[1]][groups[2]]=value;
            }
        }
        //Filter empty element and construct cards with rates additional information
        boxTextsArray = boxTextsArray.filter((item)=>{
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
            <h1 class="glow text-center pt-1">${this.state.ratesDescription.pretitulo}</h1>
            <h1 class="glow text-center pt-1">${this.state.ratesDescription.titulo}</h1>
            
            <nav class="nav nav-pills nav-justified">
                <button id="btn-All" value="0" class="nav-item  nav-link">TOTES</button>
                <button id="btn-fibra" value="3" class="nav-item nav-link"><i class="fas fa-filter"></i>Fibra óptica</button>
                <button id="btn-movil" value="1" class="nav-item nav-link"><i class="fas fa-filter"></i>Móvil</button>
                <button id="btn-wifi" value="4" class="nav-item nav-link"><i class="fas fa-filter"></i>Wifi diseminado</button>
            </nav> 

            <div class="card-columns mt-5 mb-5">
                ${new RateBoxSubComponent(this.state.rates).render()}
                
            </div>
            <div class="card-deck mt-2 mb-5">
                ${boxTextsArray.join("")}
            <div>
        </div>
       
        `;
    }
}
export default Rates;
