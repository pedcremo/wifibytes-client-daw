import React from 'react';

export default function DirectDebitForm(props) {

    const description = props.description;
    return (
          <fieldset>
            <h1>{props.translate.t("payment-method0")}</h1>
            <p>{description}</p>
          </fieldset>);
  }