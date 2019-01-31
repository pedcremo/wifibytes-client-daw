import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setExpirationDate,
  paymentsubmit
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import PaymentOptions from './paymentTypes/paymentOptions';
import PaymentForm from './paymentTypes/paymentForm';
import {PropTypes} from 'prop-types';

const mapStateToProps = state => ({ ...state.payment });

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
      // alert("Submit button works!");
      this.props.dispatch(paymentsubmit(this.props));
    }
  }
  
  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
    const thisDate = new Date();
    this.props.dispatch(setExpirationDate(thisDate.getFullYear(), thisDate.getMonth()));
  }

  paymentForm(){
    let forms = [];
    switch(this.props.paymentMethod){
      case 1:
        forms.push(<MastercardVisaAmericanExpressForm
          translate={this.context} 
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
          cvv={this.props.cvv}/>);
        return forms;
      case 3:
      forms.push(<DirectDebitForm
        translate={this.context} 
        submitForm={this.submitForm}
        changeDebitOwner={this.changeDebitOwner}
        changeAddress={this.changeAddress}
        changeIban={this.changeIban}
        debitOwner={this.props.debitOwner}
        iban={this.props.iban}
        address={this.props.address}/>);
        return forms;
      default:
        console.error('CANNOT GET FROM SERVER, PAYMENT METHOD');
        return forms;
    }
  }

  render() {
    const form = this.paymentForm();
    return (
      <div className="payment-container">
        {<PaymentOptions
        onChange={this.changePaymentMethod}
        paymentOptions={this.props.paymentMethods}
        paymentMethod = {this.props.paymentMethod} />}
        {<PaymentForm
        submitForm={this.submitForm}
        forms={form}/>}
      </div>
  ); 

  }
}

Payment.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Payment);