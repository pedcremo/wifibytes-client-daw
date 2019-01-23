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
 * cvv
 * 20+ años de año de vencimiento
 * 
 * 
 */

import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setExpirationDate
} from '../../../actions/checkoutActions';
import {RegExps} from '../../../regExps';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import PaymentOptions from './paymentTypes/paymentOptions';
const mapStateToProps = state => ({ ...state.checkout });

class Payment extends React.Component {
  constructor() {
    super();
    this.changeCardOwner = ev => this.props.dispatch(paymentUpdate("cardOwner", ev.target.value));
    this.changeCardNumber = ev => this.props.dispatch(paymentUpdate("cardNumber", ev.target.value));
    this.changeExpirationMonth = ev => this.props.dispatch(paymentUpdate("expirationMonth", ev.target.value));
    this.changeExpirationYear = ev => this.props.dispatch(paymentUpdate("expirationYear", ev.target.value));
    this.changeCvv = ev => this.props.dispatch(paymentUpdate("cvv", ev.target.value));
    this.changePaymentMethod = ev => this.props.dispatch(paymentUpdate("paymentMethod", ev.target.value));
    this.submitForm = () => ev => {
      ev.preventDefault();
      alert("Submit button works!");
    }
  }
  disabled(){
    return !this.validateCvv() || !this.validateCardOwner() || !this.validateExpirationDate();
  }
  validateExpirationDate(){
    const today = new Date();
    return ((today.getMonth() + 1) >this.props.expirationMonth? today.getFullYear() < this.props.expirationYear : today.getFullYear() <= this.props.expirationYear); 
    }
  validateCvv(){
    return this.props.cvv.match(RegExps.cvv);
  }
  validateCardOwner(){
    return this.props.cardOwner.match(RegExps.cardOwner);
  }
  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
    const thisDate = new Date();
    this.props.dispatch(setExpirationDate(thisDate.getFullYear(), thisDate.getMonth()+1));
}

  render() {
    
    
    return (
      <div className="payment-container">
        {<PaymentOptions
        onChange={this.changePaymentMethod}
        paymentOptions={this.props.paymentMethods}
        paymentMethod = {this.props.paymentMethod} />}

        <div className="payment-form">

        </div>
        {<MastercardVisaAmericanExpressForm 
        submitForm={this.submitForm} 
        changeCardOwner={this.changeCardOwner}
        changeCardNumber={this.changeCardNumber}
        changeExpirationMonth={this.changeExpirationMonth}
        changeExpirationYear={this.changeExpirationYear}
        changeCvv={this.changeCvv}
        disabled={this.disabled()}
        cardOwner={this.props.cardOwner}
        cardNumber={this.props.cardNumber}
        expirationYear={this.props.expirationYear}
        expirationMonth={this.props.expirationMonth}
        cvv={this.props.cvv}/>}
      </div>
  ); 

  }
}

export default connect(mapStateToProps)(Payment);