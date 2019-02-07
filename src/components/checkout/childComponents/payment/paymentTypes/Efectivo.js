import React from 'react';

export default function EfectivoForm(props) {

    const description = props.description;
    return (
          <fieldset>
            <h1>{props.translate.t("efectivo")}</h1>
            <p>{description}</p>
          </fieldset>);
  }