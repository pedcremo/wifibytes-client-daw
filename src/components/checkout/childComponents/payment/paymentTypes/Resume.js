import React from 'react'
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';

const mapStateToProps = state => ({ ...state });

class Resume extends React.Component {


  componentDidMount() {
    //this.props.dispatch(getPaymentTypes());
  }

  render() {

    return (
      <div className="resume">
        <b><h2>{this.props.translate.t("resume")}</h2></b>
        <div className="resume-data">
          <p>{this.props.translate.t("resume-name")}: <b>{this.props.personalDataForm.fields.datosPersonales.name.value.toUpperCase()}  {this.props.personalDataForm.fields.datosPersonales.surname.value.toUpperCase()}</b></p>
          <p>{this.props.translate.t("resume-email")}: <b>{this.props.personalDataForm.fields.datosPersonales.email.value}</b></p>
          <p>{this.props.translate.t("resume-address")}: <b>{this.props.personalDataForm.fields.datosPersonales.city.value} {this.props.personalDataForm.fields.datosPersonales.zip.value} {this.props.personalDataForm.fields.datosPersonales.address.value}</b></p>
        </div>
      </div>
    );

  }
}

Resume.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Resume);