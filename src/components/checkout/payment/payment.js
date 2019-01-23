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
import DirectDebitForm from './paymentTypes/DirectDebit';
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
    this.changePaymentMethod = ev => this.props.dispatch(paymentUpdate("paymentMethod", parseInt(ev.target.value)));
    this.changeIban = ev => this.props.dispatch(paymentUpdate("iban", ev.target.value));
    this.changeAddress = ev => this.props.dispatch(paymentUpdate("address", ev.target.value));
    this.changeDebitOwner = ev => this.props.dispatch(paymentUpdate("debitOwner", ev.target.value));
    this.submitForm = () => ev => {
      ev.preventDefault();
      alert("Submit button works!");
    }
  }
  /**We have to move validations into each component */
  disabled(){
      return !this.validateDirectDebit();
  }
  validateDirectDebit(){ 
    /**
   *VALIDATE ALL NECESARI IN DIRECT DEBIT 
   */
    return this.props.iban.match(RegExps.iban) && this.props.address && this.props.debitOwner && this.validateIBAN();
  }
  validateIBAN() { 
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let IBAN = this.props.iban.toUpperCase();
      IBAN = IBAN.replace(/\s/g, ""); 
      
      let letra1,letra2,num1,num2,isbanaux;

      if (IBAN.length != 24)
          return false;

      letra1 = IBAN.substring(0, 1); 
      letra2 = IBAN.substring(1, 2);
      num1 = this.getnumIBAN(letra1); 
      num2 = this.getnumIBAN(letra2);
      isbanaux = String(num1) + String(num2) + IBAN.substring(2);
      isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

      /**
       * CALCULATE THE REST
       */
      if (this.modulo97(isbanaux) == 1){
          return true;
      }else{
          return false;
      }
  }
  modulo97(iban) { 
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let remainer = "";
      for (let i = 1; i <= Math.ceil(iban.length/7); i++) {
          remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
      }
      return remainer;
  }
  getnumIBAN(letra) { 
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return ls_letras.search(letra) + 10;
  }
  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
    const thisDate = new Date();
    this.props.dispatch(setExpirationDate(thisDate.getFullYear(), thisDate.getMonth()));
  }

  paymentForm(){
    switch(this.props.paymentMethod){
      case 1:
        return <MastercardVisaAmericanExpressForm 
        submitForm={this.submitForm} 
        changeCardOwner={this.changeCardOwner}
        changeCardNumber={this.changeCardNumber}
        changeExpirationMonth={this.changeExpirationMonth}
        changeExpirationYear={this.changeExpirationYear}
        changeCvv={this.changeCvv}
        cardOwner={this.props.cardOwner}
        cardNumber={this.props.cardNumber}
        expirationYear={this.props.expirationYear}
        expirationMonth={this.props.expirationMonth}
        cvv={this.props.cvv}/>
      case 3:
        return <DirectDebitForm 
        submitForm={this.submitForm}
        disabled={this.disabled()}
        changeDebitOwner={this.changeDebitOwner}
        changeAddress={this.changeAddress}
        changeIban={this.changeIban}/>
      default:
        console.error('CANNOT GET FROM SERVER, PAYMENT METHOD');
        return ;
    }
  }

  render() {

    return (
      <div className="payment-container">
        {<PaymentOptions
        onChange={this.changePaymentMethod}
        paymentOptions={this.props.paymentMethods}
        paymentMethod = {this.props.paymentMethod} />}

        {this.paymentForm()}
      </div>
  ); 

  }
}

export default connect(mapStateToProps)(Payment);