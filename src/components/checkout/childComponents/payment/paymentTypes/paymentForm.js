import React from 'react';

export default function PaymentForm(props) {
      const forms = props.forms;
      const formsToFill = props.forms.map((form, i) => {
        return (
          <label key={i}>
            <form.type
            number={i}
            form = {forms[i].props}/>
          </label>
        )
    });
    function showAddButton(){
      return forms.length >= 5? null : <button
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
          </fieldset>
        </form>);
  }