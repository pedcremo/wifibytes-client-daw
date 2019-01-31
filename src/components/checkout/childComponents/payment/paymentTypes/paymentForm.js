import React from 'react';

export default function PaymentForm(props) {
 
      const formsToFill = props.forms.map((form, i) => {
        return (
          <label key={i}>
            <form.type
            props={form.props}/>
          </label>
        )
    });
    return (
        <form onSubmit={props.submitForm()}>
          <fieldset>
            {formsToFill}
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              onClick={props.addPaymentMethod()}>
              Añadir método de pago
            </button>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={false}>
              Comprar
            </button>
          </fieldset>
        </form>);
  }