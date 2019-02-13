import React from 'react'
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';

const mapStateToProps = state => ({ ...state });

class Resume extends React.Component {
  /**
   * Return the personal data from the user
   */
  render() {
    return (
      <div className="resume">
        <b><h2>{this.props.translate.t("resume")}</h2></b>
        <div className="resume-data">
          <p>{this.props.translate.t("resume-name")}: <b>{this.props.currentCheckout.data.datosPersonales.name.toUpperCase()}  {this.props.currentCheckout.data.datosPersonales.surname.toUpperCase()}</b></p>
          <p>{this.props.translate.t("resume-email")}: <b>{this.props.currentCheckout.data.datosPersonales.email}</b></p>
          <p>{this.props.translate.t("resume-address")}: <b>{this.props.currentCheckout.data.datosPersonales.city} {this.props.currentCheckout.data.datosPersonales.zip} {this.props.currentCheckout.data.datosPersonales.address}</b></p>
        </div>
      </div>
    );

  }
}

Resume.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Resume);