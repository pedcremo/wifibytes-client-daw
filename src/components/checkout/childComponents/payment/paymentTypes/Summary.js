import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

const mapStateToProps = (state) => ({...state});

/** Summary Component */
class Summary extends React.Component {
  /** Render method that
   * @return {JSX}
   */
  render() {
    return (
      <div className="resume">
        <b><h2>{this.props.translate.t('resume')}</h2></b>
        <div className="resume-data">
          <p>{this.props.translate.t('resume-name')}: <b>{this.props.personalDataForm.datosPersonales.nombre ? '' : this.props.personalDataForm.datosPersonales.nombre.toUpperCase()}  {this.props.personalDataForm.datosPersonales.apellido ? '' : this.props.personalDataForm.datosPersonales.apellido.toUpperCase()}</b></p>
          <p>{this.props.translate.t('resume-email')}: <b>{this.props.personalDataForm.datosPersonales.email ? '' : this.props.personalDataForm.datosPersonales.email}</b></p>
          <p>{this.props.translate.t('resume-address')}: <b>{this.props.personalDataForm.datosPersonales.ciudad ? '' : this.props.personalDataForm.datosPersonales.ciudad} {this.props.personalDataForm.datosPersonales.codpostal ? '' : this.props.personalDataForm.datosPersonales.codpostal} {this.props.personalDataForm.datosPersonales.direccion ? '' : this.props.personalDataForm.datosPersonales.direccion}</b></p>
        </div>
      </div>
    );
  }
}

Summary.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Summary);
