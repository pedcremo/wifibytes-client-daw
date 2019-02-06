import React from 'react';

export default function DirectDebitForm(props) {

    const iban = props.iban;
    return (
          <fieldset>
            <h1>{props.translate.t("payment-method0")}</h1>

          </fieldset>);
  }