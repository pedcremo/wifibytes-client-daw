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
} from '../../actions/checkoutActions';
import {Utils} from "../../utils";
import {RegExps} from '../../regExps';
const mapStateToProps = state => ({ ...state.checkout });

class Payment extends React.Component {
  constructor() {
    super();
    this.changeCardOwner = ev => this.props.dispatch(paymentUpdate("cardOwner", ev.target.value));
    this.changeCardNumber = ev => this.props.dispatch(paymentUpdate("cardNumber", ev.target.value));
    this.changeExpirationMonth = ev => this.props.dispatch(paymentUpdate("expirationMonth", ev.target.value));
    this.changeExpirationYear = ev => this.props.dispatch(paymentUpdate("expirationYear", ev.target.value));
    this.changeCvv = ev => this.props.dispatch(paymentUpdate("cvv", ev.target.value));
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
    const cardOwner = this.props.cardOwner;
    const cardNumber = this.props.cardNumber;
    const expirationMonth = this.props.expirationMonth;
    const expirationYear = this.props.expirationYear;
    const cvv = this.props.cvv;
    
    return (
      <form onSubmit={this.submitForm()}>
                <fieldset>
                  <fieldset className="form-group">
                    <label>{Utils.translate("payment-owner")}</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder={Utils.translate("payment-owner")}
                      value={cardOwner}
                      onChange={this.changeCardOwner} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>{Utils.translate("payment-numberCard")}</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder={Utils.translate("payment-numberCard")}
                      value={cardNumber}
                      onChange={this.changeCardNumber} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>{Utils.translate("payment-expirationMonth")}</label>
                    <select
                    className="form-control form-control-lg"
                    value={expirationMonth}
                    onChange={this.changeExpirationMonth}>
                      <option value={1}>01</option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                      <option value={4}>04</option>
                      <option value={5}>05</option>
                      <option value={6}>06</option>
                      <option value={7}>07</option>
                      <option value={8}>08</option>
                      <option value={9}>09</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                    </select>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>{Utils.translate("payment-expirationYear")}</label>
                    <select
                    className="form-control form-control-lg"
                    value={expirationYear}
                    onChange={this.changeExpirationYear}>
                      <option value={2018}>2018</option>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                    </select>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>{Utils.translate("CVV")}</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder={Utils.translate("CVV")}
                      value={cvv}
                      onChange={this.changeCvv} />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.disabled()}>
                    Comprar
                  </button>
                </fieldset>
      </form>
  ); 

  }
}

export default connect(mapStateToProps)(Payment);