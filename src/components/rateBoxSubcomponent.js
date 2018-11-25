import Component from "./component";

class RateBoxSubComponent extends Component{

    constructor(ratesJSON,selectRule="") {   
        super(ratesJSON);
        this.ratesJSON=ratesJSON;  
    }
  
    /** render  */
    render() {
        
        const highlitedRates = this.ratesJSON.results.map((itemFiltered,index) => {
            const subtarifas = itemFiltered.subtarifas.map((itemSubtarifa) => {
                //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
                     
                switch (itemSubtarifa.tipo_tarifa) {
                    case 1: //Movil
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-2x fa-mobile-alt" style="color:${itemFiltered.color.hexadecimal}"></i> <br> ${this.T("home-mobile")} ${itemSubtarifa.subtarifa_minutos_gratis} ${this.T("home-min-month")}<br/>${itemSubtarifa.subtarifa_datos_internet} ${this.T("home-gb-month")} </p>`;
                        //break;
                    case 2: //Fijo
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-2x fa-phone" style="color:${itemFiltered.color.hexadecimal}"></i><br> ${this.T("home-land-phone")} </p>`;
                        //break;
                    case 3: //Fibra
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-2x fa-globe" style="color:${itemFiltered.color.hexadecimal}"></i><br> ${this.T("home-fiber-optics")} ${itemSubtarifa.subtarifa_velocidad_conexion_subida} ${this.T("home-mb-upload")} <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} ${this.T("home-mb-download")} </p>`;
                        //break;
                    case 4: //Wifi
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-2x fa-wifi" style="color:${itemFiltered.color.hexadecimal}"></i><br> ${this.T("home-wireless")} ${itemSubtarifa.subtarifa_velocidad_conexion_subida} ${this.T("home-mb-upload")} <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} ${this.T("home-mb-download")} </p>`;
                        //break;
                    default:  //TV
                        return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-2x fa-tv" style="color:${itemFiltered.color.hexadecimal}"></i><br> ${this.T("home-tv")} ${itemSubtarifa.subtarifa_num_canales} ${this.T("home-free-channels")}</p>`;
                        //break;
                }

            }); //INNER MAP
            //HARD WIRED
            const textTarifa = this.getUserLang() == "va"?itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo_va"]:itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo"];
            return `      
                    
                <div class="card rounded ${this.randomAnimation()} border text-center border-dark text-center " style="background-color: rgba(255, 255, 255, 0.8)">
                <div class="card-header  bg-dark text-light font-weight-bold"><h3><img width="32px" height="32px" src="${ itemFiltered["logo"] }"/>&nbsp;${itemFiltered.nombretarifa.toUpperCase()}</h5></div>
                <div class="card-body p-0">
                <h5 class="card-title text-white p-2 mr-0" style="background-color:${itemFiltered.color.hexadecimal}"> <span class="display-4">${itemFiltered.precio.toLocaleString()} ${this.T("home-euros-month")}</span> <br> ${this.T("home-vat-included")}</h5>
                <h5 class="card-text pr-2 pl-2 pb-4 border-bottom border-secondary"><br>${textTarifa} </h5>     
                ${subtarifas.join("")}                
                </div>
                <div class="card-footer bg-light"><a href="#rate/${itemFiltered.codtarifa}" class="btn btn-primary"><h4>${this.T("view-details")}</h4></a> <a href="#" class="btn btn-secondary"><h4>${this.T("to-contract")}</h4></a></div>
                </div>
            `;
        });

        return `
            ${highlitedRates.join("")}
        `;      
    }
};

export default RateBoxSubComponent; 
