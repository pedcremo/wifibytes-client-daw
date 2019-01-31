import React from 'react';
import {Utils} from "../../../../../utils";
import {RegExps} from '../../../../../regExps';

export default function MastercardVisaAmericanExpressForm(props) {
  props=props.props;
  function disabled(){
    return !validateCvv() || !validateCardOwner() || !validateExpirationDate();
  }
  function validateExpirationDate(){
    const today = new Date();
    return ((today.getMonth() + 1) >props.expirationMonth? today.getFullYear() < props.expirationYear : today.getFullYear() <= props.expirationYear); 
    }
  function validateCvv(){
    return props.cvv.match(RegExps.cvv);
  }
  function validateCardOwner(){
    return props.cardOwner.match(RegExps.cardOwner);
  }
  function createExpirationYears(){
    const today = new Date();
    let options = [];
    for (let i = 0; i <= 20; i++) {
      options.push(
        <option key={i} value={today.getFullYear() + i}>{today.getFullYear() + i}</option>
      );
    
  }
    return options;
  }
    const cardOwner = props.cardOwner;
    const cardNumber = props.cardNumber;
    const expirationMonth = props.expirationMonth;
    const expirationYear = props.expirationYear;
    const cvv = props.cvv;
    return (
          <fieldset>
            <h1>{props.translate.t("payment-method1")}</h1>
            <fieldset className="form-group">
              <label>{props.translate.t("payment-owner")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={props.translate.t("payment-owner")}
                value={cardOwner}
                onChange={props.changeCardOwner} />
            </fieldset>
            <fieldset className="form-group">
              <label>{props.translate.t("payment-numberCard")}</label>
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder={props.translate.t("payment-numberCard")}
                value={cardNumber}
                onChange={props.changeCardNumber} />
            </fieldset>
            <fieldset className="form-group">
              <label>{props.translate.t("payment-expirationMonth")}</label>
              <select
              className="form-control form-control-lg"
              value={expirationMonth}
              onChange={props.changeExpirationMonth}>
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
              <label>{props.translate.t("payment-expirationYear")}</label>
              <select
              className="form-control form-control-lg"
              value={expirationYear}
              onChange={props.changeExpirationYear}>
                {createExpirationYears()}
              </select>
            </fieldset>
            <fieldset className="form-group">
              <label>{props.translate.t("CVV")}</label>
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder={props.translate.t("CVV")}
                value={cvv}
                onChange={props.changeCvv} />
            </fieldset>
          </fieldset>);
  }