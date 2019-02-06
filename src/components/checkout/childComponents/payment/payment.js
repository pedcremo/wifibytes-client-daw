import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  paymentsubmit,
  setShowModalToTrue,
  setShowModalToFalse,
  setForm,
  setUnompleted,
  updateData
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

    /**Changes any form field, number is the element of the array */
    this.changeAnyFormField = (number, field) => ev =>{
      let form =this.props.form.map(
        (form, i) => i === number ? 
        {...form, props: {...form.props, [field]:ev.target.value}}
        : form
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

      this.deletePaymentMethod = number => ev => {
        ev.preventDefault();
        let form = this.props.form.filter((form, i) => {
          return i === number? null : form;
      });
        this.setForms(form);
      }
      /**
       * @param add will be true if a form has to be added and false if it has to be changed
       */
    this.changePaymentMethod = add => ev => {
      this.props.dispatch(paymentUpdate(parseInt(ev.target.value)));
      this.paymentForm(parseInt(ev.target.value), add);} 
  
      /**Closes modal and if it was selected a valid codpago will add a form*/
    this.closeModal = codpago => {
      document.getElementById("myModal").style.visibility = "hidden";
      this.props.dispatch(setShowModalToFalse());
      this.paymentForm(parseInt(codpago), true);
    }
    /**Adds a payment method */
    this.addPaymentMethod = () => ev => {
      ev.preventDefault();
      this.props.dispatch(setShowModalToTrue())
    }
    /**Updates form from reducer */
    this.setForms = forms => this.props.dispatch(setForm(forms));

    /**Adds a delete payment method button, number is the element of the array we have to remove */
    this.addDeletePaymentMethodButton = (number) => {
      return this.props.form.length > 1? <button
      className="btn btn-lg btn-primary pull-xs-right"
      onClick={this.deletePaymentMethod(number)}
      type="button">
      Quitar método de pago
    </button>:null;
    }
  }

  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
    this.props.form.length <1? this.paymentForm() : null;
    this.props.dispatch(setUnompleted());
  }

  componentDidUpdate() {
    // this.props.dispatch(setCompleted())
    this.props.dispatch(updateData('payment',{num_targeta: "holaa", propietario: "yo"}));
    this.props.dispatch(setUnompleted());
  }

  /**Get the month we are, thisDate.getMonth() is an array so january is month 0, we have to add 1 */
  getMonth(){
    const thisDate = new Date();
    return thisDate.getMonth()+1;
  }
  /**Get the year we are */
  getYear(){
    const thisDate = new Date();
    return thisDate.getFullYear();
  }
  paymentForm(codPago=1, add){
    let forms = add? this.props.form : [];
    switch(codPago){
      case 1:
        forms.push(<MastercardVisaAmericanExpressForm
          changeAnyFormField={this.changeAnyFormField}
          translate={this.context}
          cardOwner={""}
          cardNumber={""}
          expirationYear={this.getYear()}
          expirationMonth={this.getMonth()}
          cvv={""}
          deletePaymentMethod = {this.deletePaymentMethod}
          addDeletePaymentMethodButton = {this.addDeletePaymentMethodButton}
          submittedAtLeastOnce = {this.props.submittedAtLeastOnce}/>);
          this.setForms(forms);
        return forms;
      case 3:
      forms.push(<DirectDebitForm
        changeAnyFormField={this.changeAnyFormField}
        translate={this.context} 
        debitOwner={""}
        iban={""}
        address={""}
        deletePaymentMethod = {this.deletePaymentMethod}
        addDeletePaymentMethodButton = {this.addDeletePaymentMethodButton}
        submittedAtLeastOnce = {this.props.submittedAtLeastOnce}/>);
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
        submittedAtLeastOnce = {this.props.submittedAtLeastOnce}
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