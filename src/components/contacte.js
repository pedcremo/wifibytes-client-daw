/** @module ComponentsApp */

import Component from "./component";
/**
 * @class
 * Draw contacte information. A form and a google map for location
 */
class Contacte extends Component {
    /**
     * @constructor
     * @param {json} contactJSON 
     * @param {string} selectRule 
     */
    constructor(contactJSON,selectRule) { 
        super(contactJSON,selectRule);
        this.state={
            datosEmpresa:this.inputJSON
        };
        this.selectedTarget.innerHTML=this.render(this.inputJSON); 
    }
 
    /** render  */
    render() {  
	 
			return `
				<div class="row mt-25 p-5">
				<div class="col-md-6 form-group">
						<h1>${this.T("contact-title")} ${this.state.datosEmpresa.name}</h1>
					<form name="contacto">
						<div class="form-group">
							<input type="text" aria-label="Nombre" name="nombre" placeholder="${this.T("contact-name-surnames")}" required="" class="form-control">
						</div>	
						<div class="form-group">
							<input type="text" aria-label="Telefono" name="telefono" placeholder="${this.T("contact-phone")}" class="form-control">
						</div>
						<div class="form-group">
							<input type="email" aria-label="Email" name="email" placeholder="${this.T("contact-email")}" required="" class="form-control">
						</div>
						<div class="form-group">
							<textarea name="mensaje" aria-label="Mensaje" required="" rows="9" class="form-control">${this.T("contact-opinion")}</textarea>
						</div>
						<button type="button" class="btn btn-primary">${this.T("contact-send")}</button>
					</form>
				</div>
				<div class="col-md-6">
				<!--<div id="map_div" style="height:400px; width: 100%;"></div>-->

					<div class="mapouter">
						<div class="gmap_canvas">
							<iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Wifibytes%2C%20Bocairente%2C%20Espa%C3%B1a&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
							</iframe>
						</div>
						<style>.mapouter{overflow:hidden;height:500px;width:100%;}.gmap_canvas {background:none!important;height:500px;width:100%;}</style>
					</div>

					<p> ${this.state.datosEmpresa.address}, ${this.state.datosEmpresa.city}, -${this.state.datosEmpresa.zipcode}- (${this.state.datosEmpresa.province}) ${this.state.datosEmpresa.country} </p>

				</div>
			
			</div>
		`;
    }
}
export default Contacte;
