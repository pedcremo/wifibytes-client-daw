import Component from "./component";

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
                        <h5 class="card-title"> ${item.titulo}</h5>
                        <p class="card-text">${item.texto}</p>
                    </div>
                </div>
                `;
        });

        console.log(boxArray);
        const activeRates = ratesJSON[0].results.map((itemFiltered) => {
            const subtarifas = itemFiltered.subtarifas.map((itemSubtarifa) => {
                //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV      
                switch (itemSubtarifa.tipo_tarifa) {
                    case 1: //Movil
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-mobile-alt"></i> Mobile ${itemSubtarifa.subtarifa_minutos_gratis} min/month<br/>${itemSubtarifa.subtarifa_datos_internet} GB/month </p>`;
                        //break;
                    case 2: //Fijo
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-phone"></i> Land phone free calls </p>`;
                        //break;
                    case 3: //Fibra
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-globe"></i> Fiber optics ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
                        //break;
                    case 4: //Wifi
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-wifi"></i> Wireless ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
                        //break;
                    default:  //TV
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-tv"></i> TV ${itemSubtarifa.subtarifa_num_canales} free channels</p>`;
                        //break;
                }
            }); //INNER MAP

            return `      
                    
                <div class="card rounded border text-center border-dark text-center " style="background-color: rgba(255, 255, 255, 0.8)">
                <div class="card-header  bg-dark text-light"><img width="32px" height="32px" src="${itemFiltered.logo}"/>  ${itemFiltered.nombretarifa.toUpperCase()}</div>
                <div class="card-body p-0">
                <h5 class="card-title text-white bg-success p-2 mr-0">${itemFiltered.pretitulo}<br/> <span class="display-4">${itemFiltered.precio.toLocaleString() + " €/mes"}</span></h5>
                    ${subtarifas.join("")}                
                </div>
                <div class="card-footer bg-light"><a href="#" class="btn btn-primary">View details</a> <a href="#" class="btn btn-secondary">Contract</a></div>
                </div>
            `;
        });

        return `
        <div class="p-5">
        <h2 class="glow text-center pt-1">${tarifesDescription[0].pretitulo}</h2>
        <h1 class="glow text-center pt-1">${tarifesDescription[0].titulo}</h1>
        
        <div class="card-columns mt-5 mb-5">
            ${activeRates.join("")}
            ${boxArray.join("")}
        </div>
        </div>
       
        `;
    }
}
export default Rates;
