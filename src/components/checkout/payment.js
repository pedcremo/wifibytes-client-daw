/**
 * TODO
 * getSteps
 * verify state that will be true or false
 * paymentMethods can be:
 * - mastercard
 * - visa
 * - cuenta bancaria
 * 
 * Si hay un servicio cuenta bancaria, sino mastercard (by default)
 * 
 * Resumen de la compra
 * 
 * ReduxForms / SimpleForms
 * 
 * Importes de productos, servicios...
 * if(this.props.existsServices){
 *  methodPayment = cuenta bancaria;
 * }else{
 *  methodPayment = mastercard;
 * } bucle infinito, ya veremos cómo solucionarlo
 * 
 * Campos del formulario:
 * paymentMethods can be:
 * - mastercard
 * - visa
 * - cuenta bancaria
 * 
 * 
 */

import React from 'react'
import { connect } from "react-redux";
import PaymentForm from './paymentForm'

class Payment extends React.Component {
/*   submit = values => {
    // print the form values to the console
    console.log(values)
  } */
  render() {
    return <PaymentForm onSubmit={this.submit} />
  }
}
const mapStateToProps = () => {
    
  return {
      error: true
  }
};

export default connect(mapStateToProps)(Payment);