import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setUncompleted,
  updateData
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import EfectivoForm from './paymentTypes/Efectivo';
import {PaymentOptionsRadioButton} from './paymentTypes/paymentOptions';
import {PropTypes} from 'prop-types';
import Cart from '../../../cart/Cart';

const mapStateToProps = state => ({ ...state.payment });
const cartItems=JSON.parse(localStorage.getItem('cartReducer'))
class Payment extends React.Component {
  constructor() {
    super();
    this.changePaymentMethod = () => ev => {
      this.props.dispatch(paymentUpdate(parseInt(ev.target.value)));
      this.paymentForm(parseInt(ev.target.value));} 
    this.onChangeField = () => ev =>{
      console.log(ev.target.value);
    }
  }
  

  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
  }

  componentDidUpdate() {
    // this.props.dispatch(setCompleted())
    this.props.dispatch(updateData('payment',{num_targeta: "holaa", propietario: "yo"}));
    this.props.dispatch(setUncompleted());
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
        translate={this.context}
        cardOwner={""}
        cardNumber={""}
        expirationYear={this.getYear()}
        expirationMonth={this.getMonth()}
        cvv={""}/>;
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