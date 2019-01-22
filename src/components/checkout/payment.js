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
  paymentUpdate
} from '../../actions/checkoutActions';
const mapStateToProps = state => ({ ...state.checkout });

class Payment extends React.Component {
  constructor() {
    super();
    this.changeCardOwner = ev => paymentUpdate("cardOwner", ev.target.value);
    this.changeCardNumber = ev => paymentUpdate("cardNumber", ev.target.value);
    this.changeExpirationMonth = ev => paymentUpdate("expirationMonth", ev.target.value);
    this.changeExpirationYear = ev => paymentUpdate("expirationYear", ev.target.value);
    this.changeCvv = ev => paymentUpdate("cvv", ev.target.value);
    this.submitForm = () => ev => {
      ev.preventDefault();
      alert("Submit button works!");
    }
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
                    <label>Nombre en la tarjeta</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Nombre en la tarjeta"
                      value={cardOwner}
                      onChange={this.changeCardOwner} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="Número de tarjeta"
                      value={cardNumber}
                      onChange={this.changeCardNumber} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Mes de vencimiento</label>
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
                    <label>Año de vencimiento</label>
                    <select
                    className="form-control form-control-lg"
                    value={expirationYear}
                    onChange={this.changeExpirationYear}>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                    </select>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>CVV</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="CVV"
                      value={cvv}
                      onChange={this.changeCvv} />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Comprar
                  </button>
                </fieldset>
      </form>
  ); 

  }
}

export default connect(mapStateToProps)(Payment);