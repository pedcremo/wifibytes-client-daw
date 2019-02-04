import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setExpirationDate,
  paymentsubmit,
  setShowModalToTrue,
  setShowModalToFalse,
  setForm
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import {PaymentOptions, PaymentOptionsRadioButton} from './paymentTypes/paymentOptions';
import PaymentForm from './paymentTypes/paymentForm';
import {PropTypes} from 'prop-types';

const mapStateToProps = state => ({ ...state.payment });

class Payment extends React.Component {
  constructor() {
    super();

    this.changeAnyFormField = (number, field) => ev =>{
      let form =this.props.form.map(
        (form, i) => {if(i === number){
          return {...form, props: {...form.props, [field]:ev.target.value}}
        } 
        return form;
      }
    );
    this.setForms(form);

    }

      /**Submit method */

      this.submitForm = () => ev => {
        ev.preventDefault();
        alert("Submit button works!");
        this.props.dispatch(paymentsubmit(this.props));
      }

      /**Changing payment methods */

    this.changePaymentMethod = add => ev => {
      this.props.dispatch(paymentUpdate("paymentMethod", parseInt(ev.target.value)));
      this.paymentForm(parseInt(ev.target.value), add);} /**
       * 
       * @param add will be true if a form has to be added and false if it has to be changed
       */
  
    this.closeModal = codpago => {
      document.getElementById("myModal").style.visibility = "hidden";
      this.props.dispatch(setShowModalToFalse());
      this.paymentForm(parseInt(codpago), true);
    }
    
    this.addPaymentMethod = () => ev => {
      ev.preventDefault();
      this.props.dispatch(setShowModalToTrue())
    }
    this.setForms = forms => this.props.dispatch(setForm(forms));
  }
  
  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
    const thisDate = new Date();
    this.props.dispatch(setExpirationDate(thisDate.getFullYear(), thisDate.getMonth()));
    if(this.props.form.length < 1){
      this.paymentForm();
    }
  }

  getMonth(){
    const thisDate = new Date();
    return thisDate.getMonth()+1;
  }
  getYear(){
    const thisDate = new Date();
    return thisDate.getFullYear();
  }
  paymentForm(codPago=3, add){
    let forms = add? this.props.form : [];
    switch(codPago){
      case 1:
        forms.push(<MastercardVisaAmericanExpressForm
          changeAnyFormField={this.changeAnyFormField}
          translate={this.context}
          submitForm={this.submitForm}
          changeCardOwner={this.changeCardOwner}
          changeCardNumber={this.changeCardNumber}
          changeExpirationMonth={this.changeExpirationMonth}
          changeExpirationYear={this.changeExpirationYear}
          changeCvv={this.changeCvv}
          cardOwner={""}
          cardNumber={""}
          expirationYear={this.getYear()}
          expirationMonth={this.getMonth()}
          cvv={""}/>);
          this.setForms(forms);
        return forms;
      case 3:
      forms.push(<DirectDebitForm
        changeAnyFormField={this.changeAnyFormField}
        translate={this.context} 
        submitForm={this.submitForm}
        changeDebitOwner={this.changeDebitOwner}
        changeAddress={this.changeAddress}
        changeIban={this.changeIban}
        debitOwner={""}
        iban={""}
        address={""}/>);
        this.setForms(forms);
        return forms;
      default:
        return forms;
    }
  }
  showPaymentOptionsRadioButton(){
    return this.props.form.length > 1? null :  <PaymentOptionsRadioButton
    changePaymentMethod={this.changePaymentMethod}
    paymentOptions={this.props.paymentMethods}
    paymentMethod = {this.props.paymentMethod} />;
  }

  render() {
    const form = this.props.form;
    return (
      <div className="payment-container">
      {<PaymentOptions
        changePaymentMethod={this.changePaymentMethod}
        paymentOptions={this.props.paymentMethods}
        paymentMethod = {this.props.paymentMethod}
        show={this.props.showModal}
        closeModal = {this.closeModal} />}
        {this.showPaymentOptionsRadioButton()}
        {<PaymentForm
        addPaymentMethod = {this.addPaymentMethod}
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