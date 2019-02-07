import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setUncompleted,
  setCompleted,
  updateData,
  fieldUpdate
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import EfectivoForm from './paymentTypes/Efectivo';
import {PaymentOptionsRadioButton} from './paymentTypes/paymentOptions';
import Resume from './paymentTypes/Resume';
import {PropTypes} from 'prop-types';
import Cart from '../../../cart/Cart';
import {RegExps} from '../../../../regExps';

const mapStateToProps = state => ({ ...state.payment });
const cartItems=JSON.parse(localStorage.getItem('cartReducer'))
class Payment extends React.Component {
  constructor() {
    super();
    this.changePaymentMethod = () => ev => {
      this.props.dispatch(paymentUpdate(parseInt(ev.target.value)));
} 
    this.onChangeField = (field, value) =>{
      this.props.dispatch(fieldUpdate(field, value));
    }
    this.onChangeCvv = () => ev =>{
      this.onChangeField("cvv", parseInt(ev.target.value))
    }
    this.onChangeExpirationYear = () => ev =>{
      this.onChangeField("expirationYear", parseInt(ev.target.value))
    }
    this.onChangeExpirationMonth = () => ev =>{
      this.onChangeField("expirationMonth", parseInt(ev.target.value))
    }
    this.onChangeCardNumber = () => ev =>{
      this.onChangeField("cardNumber", ev.target.value)
    }
    this.onChangeCardOwner = () => ev =>{
      this.onChangeField("cardOwner", ev.target.value)
    }
  }
  isValid(){
    return this.cvvIsValid() && this.cardOwnerIsValid() && this.expirationDateIsValid();
  }
  expirationDateIsValid(){
    const today = new Date();
    return ((today.getMonth() + 1) >this.props.expirationMonth? today.getFullYear() < this.props.expirationYear : today.getFullYear() <= this.props.expirationYear); 
    }
  cvvIsValid(){
    return this.props.cvv.toString().match(RegExps.cvv);
  }
  cardOwnerIsValid(){
    return this.props.cardOwner.match(RegExps.cardOwner);
  }
  

  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
  }

  componentDidUpdate() {
    this.isValid()? this.props.dispatch(setCompleted()) : this.props.dispatch(setUncompleted());
    this.props.paymentMethod === 1? 
    this.props.dispatch(updateData('payment',{cardOwner: this.props.cardOwner, 
    cardNumber:this.props.cardNumber, expirationMonth:this.props.expirationMonth,
    expirationYear:this.props.expirationYear, cvv:this.props.cvv})):
    this.props.dispatch(updateData('payment',{codpago: this.props.paymentMethod}));
  }

  paymentForm(codPago=1){
    switch(codPago){
      case 2:
        return <EfectivoForm 
        translate={this.context}
        description={this.props.paymentMethods[0].descripcion}/>; /**Efectivo */
      case 3:
        return <DirectDebitForm
        translate={this.context}
        description={this.props.paymentMethods[1].descripcion}/>;
      default:
        return <MastercardVisaAmericanExpressForm
        onChangeField={this.onChangeField}
        onChangeCvv={this.onChangeCvv}
        onChangeCardOwner={this.onChangeCardOwner}
        onChangeCardNumber={this.onChangeCardNumber}
        onChangeExpirationMonth={this.onChangeExpirationMonth}
        onChangeExpirationYear={this.onChangeExpirationYear}
        translate={this.context}
        cardOwner={this.props.cardOwner}
        cardOwnerIsValid={this.cardOwnerIsValid()}
        cardNumberIsValid={true}
        expirationDateIsValid={this.expirationDateIsValid()}
        cvvIsValid={this.cvvIsValid()}
        cardNumber={this.props.cardNumber}
        expirationYear={this.props.expirationYear}
        expirationMonth={this.props.expirationMonth}
        cvv={this.props.cvv}/>;
    }
  }
  showPaymentOptionsRadioButton(){
    return <PaymentOptionsRadioButton
    changePaymentMethod={this.changePaymentMethod}
    paymentOptions={this.props.paymentMethods}
    paymentMethod = {this.props.paymentMethod} />;
  }

  render() {
    return (
      <div className="payment-container">
        <div className="payment-components">
          {this.showPaymentOptionsRadioButton()}
          {this.paymentForm(this.props.paymentMethod)}
        </div>
        <div className="cart-resume">
          {<Resume
          translate={this.context}
          />}
          {<Cart cartItems={cartItems}/>}
        </div>
      </div>
  );

  }
}

Payment.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Payment);