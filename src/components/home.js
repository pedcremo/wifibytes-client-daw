import Component from "./component";

class Home extends Component {

    constructor(homeJSON, selectRule) {        
        super(homeJSON,selectRule);    
        this.selectedTarget.innerHTML = this.render(this.inputJSON);       
    }

    /** render: Array with two JSONs first element tarifa?destacado=true endpoint and second home endpoint */
    render(tarifaAndHomeJSON) {
        const homeSubtitle = tarifaAndHomeJSON[1][0].subtitulo;
        const highlitedRates = tarifaAndHomeJSON[0].results.map((itemFiltered) => {
            const subtarifas = itemFiltered.subtarifas.map((itemSubtarifa) => {
                //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV      
                switch (itemSubtarifa.tipo_tarifa) {
                    case 1: //Movil
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-mobile-alt"></i> ${this.T("home-mobile")} ${itemSubtarifa.subtarifa_minutos_gratis} ${this.T("home-min-month")}<br/>${itemSubtarifa.subtarifa_datos_internet} ${this.T("home-gb-month")} </p>`;
                        //break;
                    case 2: //Fijo
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-phone"></i> ${this.T("home-land-phone")} </p>`;
                        //break;
                    case 3: //Fibra
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-globe"></i> ${this.T("home-fiber-optics")} ${itemSubtarifa.subtarifa_velocidad_conexion_subida} ${this.T("home-mb-upload")} <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} ${this.T("home-mb-download")} </p>`;
                        //break;
                    case 4: //Wifi
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-wifi"></i> ${this.T("home-wireless")} ${itemSubtarifa.subtarifa_velocidad_conexion_subida} ${this.T("home-mb-upload")} <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} ${this.T("home-mb-download")} </p>`;
                        //break;
                    default:  //TV
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-tv"></i> ${this.T("home-tv")} ${itemSubtarifa.subtarifa_num_canales} ${this.T("home-free-channels")}</p>`;
                        //break;
                }

            }); //INNER MAP
            //HARD WIRED
            const textTarifa = this.getUserLang() == "va"?itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo_va"]:itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo"];
            return `      
                    
                <div class="card rounded border text-center border-dark text-center " style="background-color: rgba(255, 255, 255, 0.8)">
                <div class="card-header  bg-dark text-light font-weight-bold"><h3><img width="32px" height="32px" src="${ itemFiltered["logo"] }"/>&nbsp;${itemFiltered.nombretarifa.toUpperCase()}</h5></div>
                <div class="card-body p-0">
                <h5 class="card-title text-white  bg-success p-2 mr-0">${textTarifa}<br/> <span class="display-4">${itemFiltered.precio.toLocaleString() + " €/mes"}</span></h5>
                    ${subtarifas.join("")}                
                </div>
                <div class="card-footer bg-light"><a href="#" class="btn btn-primary">${this.T("view-details")}</a> <a href="#" class="btn btn-secondary">${this.T("to-contract")}</a></div>
                </div>
            `;
        });

        return `
            <div class="p-5">
                <h1 class="glow text-center pb-5">${homeSubtitle}</h1>
            
                <div class="card-deck mt-2 mb-5">
                    ${highlitedRates.join("")}
                </div>
                <div class="row home-banner text-center text-white p-4"  style="background-color: rgba(0,0,0,0.6)">
                    <!-- TEXT CAROUSEL -->
                </div> 
            </div>       
        `;
    }
}
export default Home;
