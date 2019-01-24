import React from 'react'
import { connect } from "react-redux";

class Payment extends React.Component {
  constructor() {
    super();
    this.submitForm = () => ev => {
      ev.preventDefault();
      alert("Submit button works!");
    }
  }

  render() {
    const email = this.props.email;
    const expirationMonth = this.props.expireMonth;
    const expirationYear = this.props.expireYear;
    return (
      <form onSubmit={this.submitForm()}>
                <fieldset>
                  <fieldset className="form-group">
                    <label>Nombre en la tarjeta</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Nombre en la tarjeta"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="Número de tarjeta"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Mes de vencimiento</label>
                    <select
                    className="form-control form-control-lg"
                    value={expirationMonth}
                    onChange={this.changeEmail}>
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
                    onChange={this.changeEmail}>
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
                      value={email}
                      onChange={this.changeEmail} />
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
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Payment);