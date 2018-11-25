import Component from "./component";

class RateDetail extends Component {

    constructor(tarifaJSON,selectRule) { 
        super(tarifaJSON,selectRule);
        this.selectedTarget.innerHTML=this.render(this.inputJSON); 
    }
 
    /** render  */
    render(tarifaAndTarifaDescriptorJSON) {  
        let tarifa =  tarifaAndTarifaDescriptorJSON[0];
        let tarifaDescriptor =tarifaAndTarifaDescriptorJSON[1];
        return `
            <section id="tarifa" >            
                <div class="header-tarifa" style="background-color:${tarifa.color.hexadecimal}">
                    <div class="row text-white text-center">
                        <div class="col-md-12 no-padding p-5">
                            <h2>${tarifa.pretitulo }</h2>
                            <h1 class="display-4">${tarifa.nombretarifa } <span class="text-dark">${tarifa.precio}${this.T('home-euros-month')}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
		`
		
	   
    }
}
export default RateDetail;