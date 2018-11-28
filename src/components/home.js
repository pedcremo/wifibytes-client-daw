import Component from "./component";
import RateBoxSubComponent from "./rateBoxSubcomponent";
/**
 * Draw active rates home texts and jumbotron images and banners on background
 */
class Home extends Component {
    /**
     * @constructor
     * @param {json} homeJSON 
     * @param {string} selectRule 
     */
    constructor(homeJSON, selectRule) {        
        super(homeJSON,selectRule);   
        this.state={
            homeJSON:this.inputJSON[1][0], //Prefiltered by get util method
            rates:this.inputJSON[0].results
        };
        this.selectedTarget.innerHTML = this.render(this.inputJSON);       
    }

    /** render: Array with two JSONs first element tarifa?destacado=true endpoint and second home endpoint */
    render() {
                
        return `
            <div class="p-5">
                <h1 class="glow text-center pb-5">${this.state.homeJSON.subtitulo}</h1>
            
                <div class="card-deck mt-2 mb-5">

                    ${new RateBoxSubComponent(this.state.rates).render()}
                </div>
                <div class="row home-banner text-center text-white p-4"  style="background-color: rgba(0,0,0,0.6)">
                    <!-- TEXT CAROUSEL -->
                </div> 
            </div>       
            <div class="row p-5 bg-white">
                <div class="col-md-6 mt-md-0 mt-3" >
                 <h1 class="text-uppercase">${this.state.homeJSON.caja_izquierda_titulo}</h1>
                    ${this.state.homeJSON.caja_izquierda_texto}
                </div>
                <div class="col-md-6 mt-md-0 mt-3" >
                 <h1 class="text-uppercase">${this.state.homeJSON.caja_derecha_titulo}</h1>
                    ${this.state.homeJSON.caja_derecha_texto}
                </div>
            </div>
        `;
    }
}
export default Home;
