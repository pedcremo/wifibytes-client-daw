/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";
import {PropTypes} from 'prop-types'

/**
 * @class
 * Draw contacte information. A form and a google map for location
 */
class Contacte extends React.Component  {
    /**
     * @constructor
     * @param {json} contactJSON 
     * @param {string} selectRule 
     *//*
    constructor(props) { 
        super(props);
		this.state={
            contactTexts:[],
            isLoading:true
        }       
	}*/
	
	componentDidMount(){
		this.props.dispatch(getDatosEmpresa());
    }
 
    /** render  */
    render() {  
		const { error, loading, contactTexts} = this.props;
        if (error) 
            return (<div>Error! </div>);
        if (loading) 
            return (<div>Loading...</div>);
		if(contactTexts){
			return (
				<div className="row mt-25 p-5">
					<div className="col-md-6 form-group">
							<h1>{this.context.t("contact-title")} {contactTexts.name}</h1>
						<form name="contacto">
							<div className="form-group">
								<input type="text" aria-label="Nombre" name="nombre" placeholder={this.context.t("contact-name-surnames")} required="" className="form-control"/>
							</div>	
							<div className="form-group">
								<input type="text" aria-label="Telefono" name="telefono" placeholder={this.context.t("contact-phone")} className="form-control"/>
							</div>
							<div className="form-group">
								<input type="email" aria-label="Email" name="email" placeholder={this.context.t("contact-email")} required="" className="form-control"/>
							</div>
							<div className="form-group">
								<textarea name="mensaje" aria-label="Mensaje" defaultValue={this.context.t("contact-opinion")} required="" rows="9" className="form-control"></textarea>
							</div>
							<button type="button" className="btn btn-primary">{this.context.t("contact-send")}</button>
						</form>
					</div>
					<div className="col-md-6">
					{/* <div id="map_div" style="height:400px; width: 100%;"></div>  */}
	
						<div className="mapouter" styles="overflow:hidden;height:500px;width:100%;">
							<div className="gmap_canvas" styles="background:none!important;height:500px;width:100%;">
								<iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Wifibytes%2C%20Bocairente%2C%20Espa%C3%B1a&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
								</iframe>
							</div>
						</div>
	
						<p> {contactTexts.address}, {contactTexts.city}, -{contactTexts.zipcode}- ({contactTexts.province}) {contactTexts.country} </p>
					</div>
				</div>
			);
		}
		
    }
}

Contacte.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    contactTexts: state.datosEmpresa.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Contacte);