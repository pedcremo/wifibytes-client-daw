/** @module ComponentsApp */
import React from 'react';
import UserChoice from './userChoice';
import PersonalDataForm from './personalDataForm';
import SignIn from '../../../login/signIn';
import PortabilidadForm from './portabilidadForm';
import {connect} from 'react-redux';

import {getItems} from '../../../cart/cartActions';

import {EMPTY_CHILD} from '../../../../constants/actionTypes';
import {
  setCompleted,
  setUncompleted,
  updateData,
} from '../../../../actions/personalDataFormActions';

const mapDispatchToProps = (dispatch) => ({
  setCompleted: () => dispatch(setCompleted()),
  setUncompleted: () => dispatch(setUncompleted()),
  updateData: (key, data) => dispatch(updateData(key, data)),
  empty_child: (key) => dispatch({type: EMPTY_CHILD, payload: {key}}),
});

const mapStateToProps = (state) => ({
  ...state.personalDataForm,
});

const mockClientes=[0, 5, 1, 2];
const mockCompanies=['orange', 'vodafone', 'jazztel', 'yoigo', 'pepephone'];

/**
 * @class
 * Draw Login. A form to login
 */
class Personal extends React.Component {
  /**
     * @constructor
     */
  constructor(props) {
    super(props);
    this.empty_child = (key) => this.props.empty_child(key);
  }

  componentDidUpdate() {
    const {
      validForms,
      setCompleted,
      setUncompleted,
      datosPersonales,
      datosProductos,
      updateData,
    } = this.props;

    if (validForms) {
      updateData('personalData', {
        datosPersonales,
        datosProductos,
      });
      setCompleted();
    } else {
      setUncompleted();
      //this.empty_child('contracts');
    }
  }

  render() {
    return (
      <div>
        <PersonalDataForm tipCliente={mockClientes}/>

        <PortabilidadForm companies={mockCompanies}/>
      </div>
    );
  }
}


// export default Personal;
export default connect(mapStateToProps, mapDispatchToProps)(Personal);
