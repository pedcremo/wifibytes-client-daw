
/** @module ComponentsApp */
import React from 'react';
import { Utils } from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions2";
import { getDatosHome } from "../actions/datosHomeActions";

/**
 * @class
 * Draw cookies text information
 */
class Footer extends React.Component {

  componentDidMount() {
    this.props.dispatch(getDatosEmpresa());
    this.props.dispatch(getDatosHome());
  }

  /** render  */
  render() {
    /* const isLoading = this.state.isLoading; */
    const { error, loading, datosEmpresa, datosHome } = this.props;

    if (error)
      return (<div>Error! </div>);

    if (loading)
      return (<div>Loading...</div>);

    if (datosEmpresa && datosHome) {

      return (
        <div>
          <div className="container-fluid text-center text-md-left " >

            <div className="row">

              {/* Grid column */}
              <div className="col-md-6 mt-md-0 mt-3" >
                {
                  datosHome.filter((itemText) => {
                    return itemText.pk == 1;//results[1][0] : results[1]->positionPromise results[1][0]->lng valencia
                  }).map((item, index) => {
                    return <span key={index}> <h5 className="text-uppercase" key={index}>{item.caja_izquierda_titulo}</h5><label className="left_box" dangerouslySetInnerHTML={{ __html: item.caja_izquierda_texto }}></label></span>
                  })
                }

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
                    <a href={Utils.checkURL(datosEmpresa.twitter)}><i className="fab  fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href={Utils.checkURL(datosEmpresa.facebook)}><i className="fab fa-facebook"></i></a>
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
            © 2018 Copyright: <label id="companyName">{datosEmpresa.name}</label> | <i className="fas fa-phone"></i> {datosEmpresa.phone} |{datosEmpresa.address}, {datosEmpresa.city} -{datosEmpresa.zipcode}- ({datosEmpresa.province}) {datosEmpresa.country}
          </div>
          {/* Copyright */}
        </div>
      );
    }

  }
}

const mapStateToProps = state => ({
  datosEmpresa: state.datosEmpresa.items,
  datosHome: state.datosHome.items,
  loading: state.datosEmpresa.loading,
  error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Footer);

