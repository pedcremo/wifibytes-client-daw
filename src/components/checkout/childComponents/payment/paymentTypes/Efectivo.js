import React from 'react';

export default function EfectivoForm(props) {

    const description = props.description;
    return (
          <fieldset>
            <h1>Efectivo</h1>
            <p>{description}</p>
          </fieldset>);
  }