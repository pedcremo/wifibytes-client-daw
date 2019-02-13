import React from 'react';

export default function EfectivoForm(props) {

    const description = props.description;
    return (
          /**
           * In this component we show the title and the description recived from server
           * to show to the user the instructions to make the payment
           */
          <fieldset>
            <h1>{props.translate.t("efectivo")}</h1>
            <p>{description}</p>
          </fieldset>);
  }