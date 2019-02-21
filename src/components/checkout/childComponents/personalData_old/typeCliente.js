/** @module ComponentsApp */
import React from 'react';
import {PropTypes} from 'prop-types';

/**
 * @class
 * This component contain the Personal Data Form
 */
class typeCliente extends React.Component {
  render() {
    switch (this.props.type) {
      case 0:
      case 5:
        return (
          <div>
            <h4>Introduzca su dni: </h4>
            <input
              className={'form-control form-control-lg'}
              placeholder="DNI"
              name="identificador"
              type="text"
              value={this.props.dni}
              onChange={this.props.change} />
            <span className="text-danger">{!this.props.dnierror ? '':this.props.dnierror}</span>
          </div>
        );
        break;
      case 1:
        return (
          <div>
            <h4>Introduzca el cif de la empresa: </h4>
            <input
              className={'form-control form-control-lg'}
              placeholder="CIF"
              name="identificador"
              type="text"
              pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
              value={this.props.cif}
              onChange={this.props.change} />
            <span className="text-danger">{!this.props.ciferror ? '':this.props.ciferror}</span>
          </div>
        );
        break;
      case 2:
        return (
          <div>
            <h4>Introduzca su nie: </h4>
            <input
              className={'form-control form-control-lg'}
              placeholder="NIE"
              name="identificador"
              type="text"
              pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
              value={this.props.nie}
              onChange={this.props.change} />
            <span className="text-danger">{!this.props.nierror? '':this.props.nierror}</span>
          </div>
        );
        break;
    }
  }
}

typeCliente.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default typeCliente;
