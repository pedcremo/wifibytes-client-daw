/** @module ComponentsApp */
import React from 'react';
import { Utils } from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions2";
import { getDatosHome } from "../actions/datosHomeActions";
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
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

    if (datosHome.length > 0 && datosEmpresa) {
      return (
        <HashRouter>
          <div>
            <div className="container-fluid text-center text-md-left " >
              <div className="row">
                <div className="col-md-6 mt-md-0 mt-3" >
                  <h5 className="text-uppercase" >{datosHome[0].caja_izquierda_titulo}</h5><label className="left_box" dangerouslySetInnerHTML={{ __html: datosHome[0].caja_izquierda_texto }}></label>
                </div>

                <hr className="clearfix w-100 d-md-none pb-3"></hr>

                <div className="col-md-3 mb-md-0 mb-3">
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

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase">{Utils.translate("footer-hints")}</h5>

                  <ul className="list-unstyled">
                    <li>
                      <Link to="/legal">
                        {Utils.translate("footer-legal-advice")}
                      </Link>
                    </li>
                    <Link to="/cookies">
                      {Utils.translate("footer-cookies")}
                    </Link>
                    <li>
                      <a href={Utils.checkURL(datosEmpresa.twitter)}><i className="fab  fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href={Utils.checkURL(datosEmpresa.facebook)}><i className="fab fa-facebook"></i></a>
                    </li>
                  </ul>

                </div>

              </div>

            </div>

            <div className="footer-copyright text-center bg-dark py-3 text-white">
              © 2018 Copyright: <label id="companyName">{datosEmpresa.name}</label> | <i className="fas fa-phone"></i> {datosEmpresa.phone} |{datosEmpresa.address}, {datosEmpresa.city} -{datosEmpresa.zipcode}- ({datosEmpresa.province}) {datosEmpresa.country}
            </div>
          </div>
        </HashRouter>
      );
    } else {
      return (
        <span>LOADING!</span>
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