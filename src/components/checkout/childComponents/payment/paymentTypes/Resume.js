import React from 'react'
import { connect } from "react-redux";
import {PropTypes} from 'prop-types';

const mapStateToProps = state => ({ ...state });

class Resume extends React.Component {
  

  componentDidMount() {
    //this.props.dispatch(getPaymentTypes());
  }

  render() {
    //console.log(this.props.personalDataForm.datosPersonales.address.value);

    return (
        <div className="resume">
        <b><h2>{this.props.translate.t("resume")}</h2></b>
            <div className="resume-data">
          <p>{this.props.translate.t("resume-name")}: <b>{this.props.personalDataForm.datosPersonales.nombre.toUpperCase()}  {this.props.personalDataForm.datosPersonales.apellido.toUpperCase()}</b></p>
          <p>{this.props.translate.t("resume-email")}: <b>{this.props.personalDataForm.datosPersonales.email}</b></p>
          <p>{this.props.translate.t("resume-address")}: <b>{this.props.personalDataForm.datosPersonales.ciudad} {this.props.personalDataForm.datosPersonales.codpostal} {this.props.personalDataForm.datosPersonales.direccion}</b></p>
            </div>
        </div>
    );

  }
}

Resume.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Resume);