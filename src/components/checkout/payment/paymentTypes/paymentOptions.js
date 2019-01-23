import React from 'react';
export default function PaymentOptions(props) {
    console.log(props.paymentMethod);
    if(props.paymentOptions.length === 0){
        return (null);
    }
    const options = props.paymentOptions.map((option, i) => {
        /**
         * TODO
         * checked doesn't work with === for some reason, should fix that in the future
         */
        return (
            <label key={i}>
                <input type="radio" name="method" key={i} onChange={props.onChange} value={option.codpago} checked={props.paymentMethod == option.codpago}/> {option.nombre}
            </label>
        );
    });
    return (
        <form className="payment-method">
            {options}
        </form>);
  }