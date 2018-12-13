//import Component from "./component";
import React from 'react';
import {Utils} from "../utils";
/**
 * Draw footer web app
 */
class Footer extends React.Component{
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(props) { 
        super(props);
        this.state = {
            datosEmpresa:{},
            home:{}//Prefiltered by get 
        };
        //this.selectedTarget.innerHTML=this.render(this.inputJSON);     
    }

    componentDidMount(){
      let that = this;
      Promise.all([Utils.get("/datos_empresa"), Utils.get("/home",[ Utils.filterPruneArrayByLang,"lang"])]).then(function(results) {
        that.setState({
          datosEmpresa: results[0],
          home: results[1][0]
        });
      });
    }
  
    /** render */
    render() {   
      return (
        <div>
          {/* Footer Links */}
          <div className="container-fluid text-center text-md-left " >
          
            {/* Grid Grow */}
            <div className="row">

              {/* Grid column */}
              <div className="col-md-6 mt-md-0 mt-3" >
                {/* Content */}
                <h5 className="text-uppercase">{this.state.home.caja_izquierda_titulo}</h5>
                  <label className="left_box" dangerouslySetInnerHTML={{__html: this.state.home.caja_izquierda_texto}}></label>
              </div>
              {/* Grid column */}

              <hr className="clearfix w-100 d-md-none pb-3"></hr>

              {/* Grid column */}
              <div className="col-md-3 mb-md-0 mb-3">
                {/* Links */}
                <h5 className="text-uppercase">{Utils.translate("footer-menu")}</h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#catalog">{Utils.translate("footer-catalog")}</a>
                  </li>
                  <li>
                    <a href="#rates">{Utils.translate("footer-rates")}</a>
                  </li>
                  <li>
                    <a href="#company">{Utils.translate("footer-company")}</a>
                  </li>
                  <li>
                    <a href="#contacte">{Utils.translate("footer-contact")}</a>
                  </li>
                </ul>

              </div>
              {/* Grid Columns */}

              {/* Grid Columns */}
              <div className="col-md-3 mb-md-0 mb-3">
                {/* Links */}
                <h5 className="text-uppercase">{Utils.translate("footer-hints")}</h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#legal">{Utils.translate("footer-legal-advice")}</a>
                  </li>
                  <li>
                    <a href="#cookies">{Utils.translate("footer-cookies")}</a>
                  </li>
                  <li>
                    <a href={Utils.checkURL(this.state.datosEmpresa.twitter)}><i className="fab  fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href={Utils.checkURL(this.state.datosEmpresa.facebook)}><i className="fab fa-facebook"></i></a>
                  </li>
                </ul>

              </div>
              {/* Grid Columns */}
              
            </div>
            {/* Grid Grow */}

          </div>
          {/* Footer Links */}

          {/* Copyright */}
          <div className="footer-copyright text-center bg-dark py-3 text-white">
            © 2018 Copyright: <label id="companyName">{this.state.datosEmpresa.name}</label> | <i className="fas fa-phone"></i> {this.state.datosEmpresa.phone} |{this.state.datosEmpresa.address}, {this.state.datosEmpresa.city} -{this.state.datosEmpresa.zipcode}- ({this.state.datosEmpresa.province}) {this.state.datosEmpresa.country}
          </div>
          {/* Copyright */}
        </div>
          
      ); 
    }
}

export default Footer;
