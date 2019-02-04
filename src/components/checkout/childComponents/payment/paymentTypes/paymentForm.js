import React from 'react';

export default function PaymentForm(props) {
      const formulario = props.forms;
      console.log()
      const formsToFill = props.forms.map((form, i) => {
        return (
          <label key={i}>
            <form.type
            number={i}
            forms = {formulario}/>
          </label>
        )
    });
    function showAddButton(){
      return formulario.length >= 5? null : <button
      className="btn btn-lg btn-primary pull-xs-right"
      onClick={props.addPaymentMethod()}>
      Añadir método de pago
    </button>;
    }
    return (
        <form onSubmit={props.submitForm()}>
          <fieldset>
            {formsToFill}
            {showAddButton()}
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={false}>
              Comprar
            </button>
          </fieldset>
        </form>);
  }