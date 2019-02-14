import React from 'react'
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';

const mapStateToProps = state => ({ ...state });

class Resume extends React.Component {


  componentDidMount() {
    //this.props.dispatch(getPaymentTypes());
  }

  render() {
    if(this.props.personalDataForm.fields)
      console.log("a");
    return (
      <div className="resume">
        <b><h2>{this.props.translate.t("resume")}</h2></b>
        <div className="resume-data">
          <p>{this.props.translate.t("resume-name")}: <b>{this.props.personalDataForm.fields.datosPersonales.name.value?"":this.props.personalDataForm.fields.datosPersonales.name.toUpperCase()}  {this.props.personalDataForm.fields.datosPersonales.surname.value?"":this.props.personalDataForm.fields.datosPersonales.surname.toUpperCase()}</b></p>
          <p>{this.props.translate.t("resume-email")}: <b>{this.props.personalDataForm.fields.datosPersonales.email.value?"":this.props.personalDataForm.fields.datosPersonales.email}</b></p>
          <p>{this.props.translate.t("resume-address")}: <b>{this.props.personalDataForm.fields.datosPersonales.city.value?"":this.props.personalDataForm.fields.datosPersonales.city} {this.props.personalDataForm.fields.datosPersonales.zip.value?"":this.props.personalDataForm.fields.datosPersonales.zip} {this.props.personalDataForm.fields.datosPersonales.address.value?"":this.props.personalDataForm.fields.datosPersonales.address}</b></p>
        </div>
      </div>
    );

  }
}

Resume.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Resume);