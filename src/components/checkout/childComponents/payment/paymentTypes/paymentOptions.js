import React from 'react';

  export function PaymentOptionsRadioButton(props) {
    if(props.paymentOptions.length === 0){
        return (null);
    }
    const options = props.paymentOptions.map((option, i) => {
        return (
            <label key={i}>
                <input type="radio" name="method" key={i} onChange={props.changePaymentMethod()} value={option.codpago} checked={props.paymentMethod === option.codpago}/> {option.nombre}
            </label>
        );
    });
    return (
        <form className="payment-method">
            {options}
        </form>);
  }
