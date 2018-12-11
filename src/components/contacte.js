/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";

/**
 * @class
 * Draw contacte information. A form and a google map for location
 */
class Contacte extends React.Component  {
    /**
     * @constructor
     * @param {json} contactJSON 
     * @param {string} selectRule 
     */
    constructor(props) { 
        super(props);
		this.state={
            contactTexts:[],
            isLoading:true
        }
        //this.selectedTarget.innerHTML=this.render(this.inputJSON); 
	}
	
	componentDidMount(){
        let that=this;
        Utils.get("/datos_empresa").then(function(response) {          
		let contactTexts = response;

			that.setState({
                contactTexts: contactTexts,
                isLoading:false
            });
        }).catch(function(error) {
            console.log("Error", error);
        });
    }
 
    /** render  */
    render() {  
		return (
			<div class="row mt-25 p-5">
				<div class="col-md-6 form-group">
						<h1>{Utils.translate("contact-title")} {this.state.contactTexts.name}</h1>
					<form name="contacto">
						<div class="form-group">
							<input type="text" aria-label="Nombre" name="nombre" placeholder={Utils.translate("contact-name-surnames")} required="" class="form-control"/>
						</div>	
						<div class="form-group">
							<input type="text" aria-label="Telefono" name="telefono" placeholder={Utils.translate("contact-phone")} class="form-control"/>
						</div>
						<div class="form-group">
							<input type="email" aria-label="Email" name="email" placeholder={Utils.translate("contact-email")} required="" class="form-control"/>
						</div>
						<div class="form-group">
							<textarea name="mensaje" aria-label="Mensaje" required="" rows="9" class="form-control">{Utils.translate("contact-opinion")}</textarea>
						</div>
						<button type="button" class="btn btn-primary">{Utils.translate("contact-send")}</button>
					</form>
				</div>
				<div class="col-md-6">
				{/* <div id="map_div" style="height:400px; width: 100%;"></div>  */}

					<div class="mapouter" styles="overflow:hidden;height:500px;width:100%;">
						<div class="gmap_canvas" styles="background:none!important;height:500px;width:100%;">
							<iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Wifibytes%2C%20Bocairente%2C%20Espa%C3%B1a&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					</div>

					<p> {this.state.contactTexts.address}, {this.state.contactTexts.city}, -{this.state.contactTexts.zipcode}- ({this.state.contactTexts.province}) {this.state.contactTexts.country} </p>
				</div>
			</div>
		);
    }
}
export default Contacte;