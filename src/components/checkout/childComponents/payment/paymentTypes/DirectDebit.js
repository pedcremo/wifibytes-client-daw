import React from 'react';

export default function DirectDebitForm(props) {

    const description = props.description;
    return (
          /**
           * In this component we show the title and the description recived from server
           * to show to the user the iban to do the transfer
           */
          <fieldset>
            <h1>{props.translate.t("payment-method0")}</h1>
            <p>{description}</p>
          </fieldset>);
  }