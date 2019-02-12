import React from 'react';

export default function MastercardVisaAmericanExpressForm(props) {
  const cardOwner = props.cardOwner;
  const cardNumber = props.cardNumber;
  const expirationMonth = props.expirationMonth;
  const expirationYear = props.expirationYear;
  const cvv = props.cvv;

  function createExpirationYears() {
    let options = [];
    const today = new Date();
    for (let i = 0; i <= 20; i++) {
      options.push(
        <option key={i} value={today.getFullYear() + i}>{today.getFullYear() + i}</option>
      );

    }
    return options;
  }

  return (
    <fieldset>
      <h1>{props.translate.t("payment-method1")}</h1>
      <fieldset className="form-group">
        <h3 className="errors"
          hidden={props.cardOwnerIsValid}>
          Something is wrong with this field, check it out!</h3>
        <label>{props.translate.t("payment-owner")}</label>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder={props.translate.t("payment-owner")}
          value={cardOwner}
          onChange={props.onChangeCardOwner()} />
      </fieldset>
      <fieldset className="form-group">
        <h3 className="errors"
          hidden={props.cardNumberIsValid}>
          Something is wrong with this field, check it out!</h3>
        <label>{props.translate.t("payment-numberCard")}</label>
        <input
          className="form-control form-control-lg"
          type="number"
          placeholder={props.translate.t("payment-numberCard")}
          value={cardNumber}
          onChange={props.onChangeCardNumber()} />
      </fieldset>
      <fieldset className="form-group">
        <h3 className="errors"
          hidden={props.expirationDateIsValid}>
          Something is wrong with the expiration date, check it out!</h3>
        <label>{props.translate.t("payment-expirationMonth")}</label>
        <select
          className="form-control form-control-lg"
          value={expirationMonth}
          onChange={props.onChangeExpirationMonth()}>
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
          onChange={props.onChangeExpirationYear()}>
          {createExpirationYears()}
        </select>
      </fieldset>
      <fieldset className="form-group">
        <h3 className="errors"
          hidden={props.cvvIsValid}>
          Something is wrong with this field, check it out!</h3>
        <label>{props.translate.t("CVV")}</label>
        <input
          className="form-control form-control-lg"
          type="number"
          placeholder={props.translate.t("CVV")}
          value={cvv}
          onChange={props.onChangeCvv()} />
      </fieldset>
    </fieldset>);
}