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
/**
 * Stripe apis
 * public key:pk_test_MNfK7djOIZNyWbIp4BlJCgJi
 * secre key : sk_test_JDWG4vGA3yZ7e0BAvTJkh82N
 */
import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setExpirationDate
} from '../../../actions/checkoutActions';
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
      //ev.preventDefault();
      alert("Submit button works!");
      //this.props.dispatch(paymentsubmit("submitPayment"), ev.target.value);
    }
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
        changeDebitOwner={this.changeDebitOwner}
        changeAddress={this.changeAddress}
        changeIban={this.changeIban}
        debitOwner={this.props.debitOwner}
        iban={this.props.iban}
        address={this.props.address}/>
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